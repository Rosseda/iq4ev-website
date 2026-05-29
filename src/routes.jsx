import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import TerrainIntel from "./pages/TerrainIntel";
import Pulse360 from "./pages/Pulse360";
import EVSS from "./pages/EVSS";
import Briefings from "./pages/Briefings";
import Consulting from "./pages/Consulting";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

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
        path: "briefings",
        element: <Briefings />,
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
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;