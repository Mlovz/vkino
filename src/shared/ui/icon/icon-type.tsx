import { ReactComponent as Favorite } from '@/shared/assets/Favorite.svg';
import { ReactComponent as Search } from '@/shared/assets/Search.svg';
import { ReactComponent as Close } from '@/shared/assets/Close.svg';

import { newGuid } from '@/shared/lib/guid';

export enum IconType {
  FAVORITE = 'favorite',
  SEARCH = 'search',
  CLOSE = 'close',
}
export const icon = new Map([
  [IconType.FAVORITE, <Favorite key={newGuid()} />],
  [IconType.SEARCH, <Search key={newGuid()} />],
  [IconType.CLOSE, <Close key={newGuid()} />],
]);
