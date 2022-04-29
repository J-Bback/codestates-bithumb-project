import React, { useState } from 'react';
import Nav from '../../components/Nav';
import styles from './Stake.module.scss';

function Stake() {
  const [navigation, setNavigation] = useState<string>('stake');
  return (
    <div className={styles.container}>
      <Nav setItem={(key: string) => setNavigation(key)} default={'stake'} />
      준비중입니다.
    </div>
  );
}

export default Stake;
