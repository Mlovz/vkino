import { AppRouteKey } from './route-types';

export const ROUTES: Record<AppRouteKey, string> = {
  [AppRouteKey.MAIN]: '/',
  [AppRouteKey.MOVIE]: '/movie/:id',
  [AppRouteKey.FAVORITES]: '/favorites',
  [AppRouteKey.NOT_FOUND]: '*',
};
