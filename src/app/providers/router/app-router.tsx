import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { routeConfig } from './route-config';
import { Loader } from '@/shared/ui';

export const AppRouter = () => {
  const routes = useRoutes(routeConfig);

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
};
