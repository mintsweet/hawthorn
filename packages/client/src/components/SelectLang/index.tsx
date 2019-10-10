import React from 'react';
import classNames from 'classnames';
import { Dropdown, Menu, Icon } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import styles from './index.less';

interface SelectLangProps {
  className: string;
};

const SelectLang = React.memo(({ className }: SelectLangProps) => {
  const selectedLang = getLocale();

  const changeLang = ({ key }: ClickParam): void => setLocale(key, false);

  const locales = ['zh-CN', 'en-US'];

  const languageLabels: any = {
    'zh-CN': '简体中文',
    'en-US': 'English',
  };

  const languageIcons: any = {
    'zh-CN': '🇨🇳',
    'en-US': '🇺🇸',
  };

  const langMenu = (
    <Menu
      className={styles.menu}
      selectedKeys={[selectedLang]}
      onClick={changeLang}
    >
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <Icon type="global" title={formatMessage({ id: 'lang' })} />
      </span>
    </Dropdown>
  );
});

export default SelectLang;
