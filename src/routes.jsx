import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Pulse360 from "./pages/Pulse360.jsx";
import TerrainIntel from "./pages/TerrainIntel.jsx";
import EVSS from "./pages/EVSS.jsx";
import Consulting from "./pages/Consulting.jsx";
import Insights from "./pages/Insights.jsx";
import InsightDetail from "./pages/InsightDetail.jsx";
import Briefings from "./pages/Briefings.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
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
        path: "pulse360",
        element: <Pulse360 />,
      },
      {
        path: "terrainintel",
        element: <TerrainIntel />,
      },
      {
        path: "evss",
        element: <EVSS />,
      },
      {
        path: "consulting",
        element: <Consulting />,
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
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;