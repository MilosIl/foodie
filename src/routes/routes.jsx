import {
  HomePageLayout,
  RegisterPageLayout,
  ProfilePageLayout,
  LoginPageLayout,
  RecipesPageLayout,
} from "@/layouts";

import {
  HomePage,
  ProfilePage,
  RecipesPage,
  RegisterPage,
  LoginPage,
} from "@/pages";

import { ProtectedRoute } from "@/routes/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPageLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPageLayout />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        <ProfilePageLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/recipes",
    element: <RecipesPageLayout />,
    children: [
      {
        index: true,
        element: <RecipesPage />,
      },
    ],
  },
];

export default routes;
