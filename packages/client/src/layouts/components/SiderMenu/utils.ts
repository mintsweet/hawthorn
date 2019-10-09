import pathToRegexp from 'path-to-regexp';
import { SiderbarItemProps } from '@/models/global';
import { SiderMenuProps } from './SiderMenu';

/**
 * Recursively flatten the data
 * [{ path: string }, { path: string }] => [ path, path2 ]
 * @param data
 */
export const getFlatMenuKeys = (data: SiderbarItemProps[]) => {
  let keys: Array<string> = [];
  data.forEach(item => {
    keys.push(item.path);
    if (item.routes) {
      keys = keys.concat(getFlatMenuKeys(item.routes));
    }
  });
  return keys;
;}

/**
 * Split pathname
 * '/auth/user' => ["/auth", "/auth/user"]
 * @param url
 */
export const urlToList = (url: string) => {
  const urlList = url.split('/').filter(Boolean);
  return urlList.map((item, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

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
