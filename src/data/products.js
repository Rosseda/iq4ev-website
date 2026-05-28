import { Activity, Map, BarChart3, BriefcaseBusiness } from "lucide-react";

export const products = [
  {
    title: "Pulse360",
    status: "Flagship",
    path: "/pulse360",
    icon: Activity,
    description:
      "Charger and property intelligence for uptime, risk, visibility and infrastructure condition reporting.",
  },
  {
    title: "TerrainIntel",
    status: "Planning",
    path: "/terrainintel",
    icon: Map,
    description:
      "Spatial planning intelligence for charger placement, corridors, grid context and scenario comparison.",
  },
  {
    title: "EVSS",
    status: "Simulation",
    path: "/evss",
    icon: BarChart3,
    description:
      "EV fleet simulation based on route, terrain, environmental conditions, charging assumptions and duty-cycle realities.",
  },
  {
    title: "Consulting",
    status: "Advisory",
    path: "/consulting",
    icon: BriefcaseBusiness,
    description:
      "Strategic EV advisory for infrastructure planning, operational readiness, market intelligence and implementation support.",
  },
];