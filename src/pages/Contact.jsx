import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";

export default function Contact() {
  return (
    <>
      <SEO {...seoConfig.contact} />

      <div>
      <PageHeader
        eyebrow="Contact"
        title="Request a briefing or discussion."
        description="Contact IQ4EV regarding infrastructure intelligence, strategic EV advisory, Pulse360, TerrainIntel, EVSS or enterprise briefings."
      />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-600">
              Contact details
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Company
                </p>

                <p className="mt-2 text-xl font-black text-slate-950">
                  IQ4EV (Pty) Ltd
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Email
                </p>

                <p className="mt-2 text-lg font-semibold text-slate-950">
                  info@iq4ev.co.za
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Focus
                </p>

                <p className="mt-2 text-lg font-semibold text-slate-950">
                  Strategic EV Data & Consulting
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-600">
              Engagement areas
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                Pulse360 demonstrations
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                TerrainIntel planning discussions
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                EVSS fleet readiness analysis
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                Enterprise EV briefings
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                Strategic EV consulting
              </div>
            </div>

            <div className="mt-8">
              <Button to="/">Return to homepage</Button>
            </div>
          </div>
        </div>
      </section>
       </div>
  </>
);
}