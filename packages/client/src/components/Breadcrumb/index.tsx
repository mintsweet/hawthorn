import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { formatMessage } from 'umi-plugin-locale';
import { Location } from 'history';
import pathToRegexp from 'path-to-regexp';
import { Breadcrumb } from 'antd';
import { urlToList } from '../utils';
import styles from './index.less';

interface BreadcrumbViewProps {
  location: Location;
  breadcrumbNameMap: any;
}

export const getBreadcrumb = (breadcrumbNameMap: any, url: string) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

export default class BreadcrumbView extends PureComponent<BreadcrumbViewProps> {
  state = {
    breadcrumb: null,
  };

  componentDidMount() {
    this.getBreadcrumbDom();
  }

  componentDidUpdate(preProps: BreadcrumbViewProps) {
    const { location } = this.props;
    if (!location || !preProps.location) {
      return;
    }
    const prePathname = preProps.location.pathname;
    if (prePathname !== location.pathname) {
      this.getBreadcrumbDom();
    }
  }

  getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList();
    this.setState({
      breadcrumb,
    });
  }

  conversionBreadcrumbList = () => {
    const { location, breadcrumbNameMap } = this.props;
    const pathSnippets = urlToList(location.pathname);

    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      const isLinkable = index !== pathSnippets.length - 1;

      return currentBreadcrumb.name ? (
        <Breadcrumb.Item key={url}>
          {isLinkable
            ? <Link to={url}>{currentBreadcrumb.name}</Link>
            : <span>{currentBreadcrumb.name}</span>
          }
        </Breadcrumb.Item>
      ) : null;
    });

    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="/">
        <Link to="/">{formatMessage({ id: 'component.breadcrumb.home' })}</Link>
      </Breadcrumb.Item>
    );

    return extraBreadcrumbItems;
  }

  render() {
    const { breadcrumb } = this.state;

    return (
      <Breadcrumb className={styles.breadcrumb}>
        {breadcrumb}
      </Breadcrumb>
    );
  }
}
