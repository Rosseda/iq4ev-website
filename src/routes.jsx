import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import TerrainIntel from "./pages/TerrainIntel";
import Pulse360 from "./pages/Pulse360";
import EVSS from "./pages/EVSS";
import Briefings from "./pages/Briefings";
import Consulting from "./pages/Consulting";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import AdminContent from "./pages/AdminContent";
import AdminContentEditor from "./pages/AdminContentEditor";
import BriefingDetail from "./pages/BriefingDetail";
import AdminSubscribers from "./pages/AdminSubscribers";
import Subscribe from "./pages/Subscribe";
import AccountSettings from "./pages/AccountSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "terrainintel",
        element: <TerrainIntel />,
      },
      {
        path: "pulse360",
        element: <Pulse360 />,
      },
      {
        path: "evss",
        element: <EVSS />,
      },
      {
        path: "insights",
        element: <Insights />,
      },
      {
        path: "insights/:slug",
        element: <InsightDetail />,
      },
      {
        path: "briefings",
        element: <Briefings />,
      },
      {
        path: "consulting",
        element: <Consulting />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "account/settings",
        element: <AccountSettings />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "admin/content",
        element: <AdminContent />,
      },
      {
        path: "admin/content/edit/:id",
        element: <AdminContentEditor />,
      },
      {
        path: "admin/content/new",
        element: <AdminContentEditor />,
      },
      {
        path: "admin/content/:id/edit",
        element: <AdminContentEditor />,
      },
      {
        path: "admin/subscribers",
        element: <AdminSubscribers />,
      },
      {
       path: "subscribe",
       element: <Subscribe />,
      },
      {
       path: "briefings",
       element: <Briefings />,
      },
      {
        path: "briefings/:slug",
        element: <BriefingDetail />,
      },
    ],
  },
]);

export default router;