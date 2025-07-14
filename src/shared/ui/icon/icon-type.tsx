import { ReactComponent as Favorite } from '@/shared/assets/Favorite.svg';
import { ReactComponent as Search } from '@/shared/assets/Search.svg';
import { ReactComponent as Close } from '@/shared/assets/Close.svg';
import { ReactComponent as Star } from '@/shared/assets/Star.svg';

import { newGuid } from '@/shared/lib/guid';

export enum IconType {
  FAVORITE = 'favorite',
  SEARCH = 'search',
  CLOSE = 'close',
  STAR = 'star',
}
export const icon = new Map([
  [IconType.FAVORITE, <Favorite key={newGuid()} />],
  [IconType.SEARCH, <Search key={newGuid()} />],
  [IconType.CLOSE, <Close key={newGuid()} />],
  [IconType.STAR, <Star key={newGuid()} />],
]);
