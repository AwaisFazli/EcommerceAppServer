import { ROUTES } from "../utils/routes";

export const PROTECTED_ROUTES = [
  {
    id: 1,
    path: ROUTES.PROTECTED_ROUTES_NAMES.root,
    element: <h1>Dashboard</h1>,
  },
  {
    id: 2,
    path: ROUTES.PROTECTED_ROUTES_NAMES.blogs,
    element: <h1>Blog</h1>,
  },
  {
    id: 3,
    path: ROUTES.PROTECTED_ROUTES_NAMES.departments,
    element: <h1>Departments</h1>,
  },
  {
    id: 4,
    path: ROUTES.PROTECTED_ROUTES_NAMES.projects,
    element: <h1>projects</h1>,
  },
];
