import pathToRegexp from 'path-to-regexp';
import { SiderMenuProps } from './SiderMenu';
import { urlToList } from '../utils';

/**
 * Get menu select key
 * @param flatMenuKeys
 * @param path
 */
export const getMenuMatches = (flatMenuKeys: string[], path: string) =>
  flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });

/**
 * Get menu children
 * @param props
 */
export const getDefaultCollapsedSubMenus = (props: SiderMenuProps) => {
  const {
    location: { pathname },
    flatMenuKeys,
  } = props;

  return urlToList(pathname)
    .map(path => getMenuMatches(flatMenuKeys, path)[0])
    .filter(Boolean);
}
