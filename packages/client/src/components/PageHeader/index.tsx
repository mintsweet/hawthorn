import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Context } from '@/layouts/BasicLayout'
import Breadcrumb from './components/Breadcrumb';
import styles from './index.less';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  hiddenBreadcrumb: boolean;
};

export default class PageHeader extends PureComponent<PageHeaderProps> {
  static defaultProps = {
    hiddenBreadcrumb: false,
  };

  render() {
    const { hiddenBreadcrumb, className, children } = this.props;
    const clsName = classNames(className, styles.pageHeader);

    return (
      <div className={clsName}>
        <Context.Consumer>
          {(value: any) => (
            <>
              {!hiddenBreadcrumb && (
                <Breadcrumb
                  {...value}
                />
              )}
              <div className={styles.content}>{children}</div>
            </>
          )}
        </Context.Consumer>
      </div>
    );
  }
}
