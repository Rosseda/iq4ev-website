import {
  Activity,
  Map,
  BarChart3,
  BriefcaseBusiness,
  Newspaper,
} from "lucide-react";

export const products = [
  {
    title: "Pulse360",
    status: "Flagship",
    path: "/pulse360",
    icon: Activity,
    description:
      "Charger and property intelligence for uptime, infrastructure condition, risk visibility and site-level reporting.",
  },
  {
    title: "TerrainIntel",
    status: "Planning",
    path: "/terrainintel",
    icon: Map,
    description:
      "Spatial EV infrastructure intelligence for charger placement, corridors, grid context and scenario comparison.",
  },
  {
    title: "EVSS",
    status: "Simulation",
    path: "/evss",
    icon: BarChart3,
    description:
      "EV fleet simulation using route, terrain, environment, charging assumptions and operational duty-cycle realities.",
  },
  {
    title: "Enterprise Briefings",
    status: "Intelligence",
    path: "/briefings",
    icon: Newspaper,
    description:
      "Commercial EV intelligence briefings covering infrastructure trends, risk signals, regulation and strategic market movement.",
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