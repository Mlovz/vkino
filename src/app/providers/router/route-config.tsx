// src/app/providers/router/routeConfig.tsx
import { ROUTES } from '@/shared/config/route/route-paths';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const MainPage = lazy(() => import('@/pages/home-page/ui/home-page'));
const MovieDetailsPage = lazy(() => import('@/pages/movie-page/ui/movie-page'));
const FavoritesPage = lazy(
  () => import('@/pages/favorites-page/ui/favorites-page')
);
const NotFoundPage = lazy(
  () => import('@/pages/not-found-page/ui/not-found-page')
);

export const routeConfig: RouteObject[] = [
  {
    path: ROUTES.main,
    element: <MainPage />,
  },
  {
    path: ROUTES.movie,
    element: <MovieDetailsPage />,
  },
  {
    path: ROUTES.favorites,
    element: <FavoritesPage />,
  },
  {
    path: ROUTES.not_found,
    element: <NotFoundPage />,
  },
];
