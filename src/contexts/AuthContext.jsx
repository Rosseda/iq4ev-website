import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);

async function fetchProfile(userId) {
  if (!supabase || !userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, email, full_name, company, position, role, subscription_status"
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Profile load error:", error.message);
    return null;
  }

  return data;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    async function initialiseAuth() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Session load error:", error.message);
        setSession(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      const currentSession = data.session ?? null;
      setSession(currentSession);

      if (currentSession?.user?.id) {
        const currentProfile = await fetchProfile(currentSession.user.id);

        if (mounted) {
          setProfile(currentProfile);
        }
      }

      if (mounted) {
        setLoading(false);
      }
    }

    initialiseAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession ?? null);

      if (!currentSession?.user?.id) {
        setProfile(null);
        setLoading(false);
        return;
      }

      /*
        Important:
        Do not await Supabase queries directly inside onAuthStateChange.
        It can cause auth requests to hang in some cases.
      */
      setTimeout(async () => {
        const currentProfile = await fetchProfile(currentSession.user.id);

        if (mounted) {
          setProfile(currentProfile);
          setLoading(false);
        }
      }, 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      isLoggedIn: Boolean(session?.user),
      isAdmin: profile?.role === "admin",
      isSubscriber:
        profile?.role === "subscriber" &&
        profile?.subscription_status === "active",
    }),
    [session, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}