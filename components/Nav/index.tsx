import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './Nav.module.scss';
import Image from 'next/image';

type Items = {
  key: string;
  label: string;
};

interface Props {
  setItem: any;
  default: string;
}

const Nav = (props: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(props.default);
  const items = [
    { key: 'home', label: 'HOME' },
    { key: 'exchange', label: 'EXCHANGE' },
    { key: 'stake', label: 'STAKE' },
    { key: 'farm', label: 'FARM' },
  ];
  const renderItems = () => {
    return (
      <div className={styles.itemWrap}>
        {items.map((v, i) => {
          return (
            <div
              key={'nav' + i}
              className={selected === v.key ? styles.activeItem : styles.item}
              onClick={() => selectItem(v.key)}>
              {v.label}
            </div>
          );
        })}
      </div>
    );
  };

  const selectItem = (key: string) => {
    if (key !== selected) {
      setSelected(key);
      props.setItem(key);
      if (key === 'exchange') {
        router.push(
          {
            pathname: '/exchange',
            query: { tab: 'krw' },
          },
          undefined,
          { shallow: true }
        );
        return;
      }
      router.push({ pathname: `/${key}` }, undefined, { shallow: true });
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_container}>
        <div className={styles.nav_logo} onClick={() => selectItem('home')}>
          <div style={{ marginRight: 10 }}>
            <Image src="/images/candlestick.png" alt="Search Button" width={40} height={40} />
          </div>
          BITRADER
        </div>
        {renderItems()}
        <div>SIGN IN</div>
      </div>
    </nav>
  );
};

export default Nav;
