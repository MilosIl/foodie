import { HomePageLayout, LoginPageLayout } from "@/layouts";

import {
  HomePage,
  ProfilePage,
  RecipesPage,
  RegisterPage,
  LoginPage,
  FavoritesPage,
  SingleRecipePage,
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
    element: <LoginPageLayout />,
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
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recipes",
    element: <HomePageLayout />,
    children: [
      {
        index: true,
        element: <RecipesPage />,
      },
      {
        path: ":id",
        element: <SingleRecipePage />,
      },
    ],
  },
  {
    path: "/favorites",
    element: <HomePageLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
