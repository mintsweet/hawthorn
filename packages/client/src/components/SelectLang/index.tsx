import React from 'react';
import classNames from 'classnames';
import { Dropdown, Menu, Icon, message } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import * as CommonService from '@/services/common';
import styles from './index.less';

interface SelectLangProps {
  className?: string;
};

const SelectLang = ({ className }: SelectLangProps) => {
  const selectedLang = getLocale();

  const changeLang = async ({ key }: ClickParam) => {
    if (selectedLang === key) {
      return;
    }
    setLocale(key, false);
    await CommonService.updateLang({ lang: key });
    message.success(formatMessage({ id: 'component.selectLang.message' }));
  };

  const locales = [
    'zh-CN',
    'zh-TW',
    'en-US',
  ];

  const languageLabels: any = {
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
    'en-US': 'English',
  };

  const languageIcons: any = {
    'zh-CN': '🇨🇳',
    'zh-TW': '🇭🇰',
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
        <Icon type="global" title={formatMessage({ id: 'component.selectLang.icon' })} />
      </span>
    </Dropdown>
  );
};

export default SelectLang;
