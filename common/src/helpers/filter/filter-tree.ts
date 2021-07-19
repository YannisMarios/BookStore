import { filter, includes, isEmpty, toLower } from 'lodash';

export const filterTree = (searchTerm: string, list: any[]) => {
  return filter(list, (item) => {
    if (includes(toLower(item.path), toLower(searchTerm))) {
      return true;
    } else if (item.children) {
      item.children = filterTree(searchTerm, item.children);
      return !isEmpty(item.children);
    }
  });
};
