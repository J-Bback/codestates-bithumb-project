import React, { useState } from 'react';
import Nav from '../../components/Nav';
import styles from './Farm.module.scss';

function Farm() {
  const [navigation, setNavigation] = useState<string>('farm');
  return (
    <div className={styles.container}>
      <Nav setItem={(key: string) => setNavigation(key)} default={'farm'} />
      준비중입니다.
    </div>
  );
}

export default Farm;
