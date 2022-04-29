import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import cloneDeep from 'lodash/cloneDeep';

import { IMainContext } from '../../interface/interface';
import { MainContext } from '../../context/Context';
import { CallApi } from '../utils/callApi';
import costComma from '../../helpers/costComma';
import signPositiveNumber from '../../helpers/signPositiveNumber';
import { coinNameKR } from '../../constants/NameParser';

import Input from '../../atoms/Input';
import Nav from '../../components/Nav';
import Tab from '../../components/Tab';
import Table from '../../components/Table';
import AreaChart from '../../components/AreaChart';

import styles from './Home.module.scss';

const Home = (props: any) => {
  const [navigation, setNavigation] = useState('home');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currencyList, setCurrencyList] = useState<any>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [series, setSeries] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [favorites, setFavorites] = useState<any[]>([]);

  const tableRef = useRef<HTMLTableRowElement>(null);

  const context = useContext<IMainContext>(MainContext);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    setFavorites([...context.favorites]);
    router.push({ query: { tab: 'krw' } }, undefined, { shallow: true });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getTicker();
    }, 1000);
  }, [currencyList]);

  const getData = async (currency: string) => {
    try {
      const orderCurrency = currency;
      const paymentCurrency = 'KRW';
      const chartIntervals = '24h';
      const data = {
        method: 'GET',
        url: `https://api.bithumb.com/public/candlestick/${orderCurrency}_${paymentCurrency}/${chartIntervals}`,
      };

      const response: any = await CallApi(data);
      const responseJson: any = await response.json();
      if (response.status === 200) {
        // const cloneData: any[] = cloneDeep(responseJson.data);
        // console.log('cloneData', cloneData);
        // const seriesData: any[] = [];
        // const fiftyData: any = cloneData.splice(-50, 50);
        // console.log('fiftyData', fiftyData);
        // const result = fiftyData.map((v: any) => seriesData.push({ x: v[0], y: v[2] }));
        // // setSeries(seriesData);
        // console.log('result', result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTicker = async () => {
    try {
      const orderCurrency = 'ALL';
      const paymentCurrency = 'KRW';

      const data = {
        method: 'GET',
        url: `https://api.bithumb.com/public/ticker/${orderCurrency}_${paymentCurrency}`,
      };

      const response: any = await CallApi(data);
      const responseJson: any = await response.json();
      if (response.status === 200) {
        // if (searchValue) {
        //   const filter = Object.keys(responseJson.data);
        // }
        setCurrencyList(responseJson.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const moveTab = (tab: string) => {
    router.push({ query: { tab } }, undefined, { shallow: true });
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const getDayToDayFluctate = (name: string, type: string) => {
    const yesterdayPrice = Number(currencyList[name].prev_closing_price);
    const currentPrice = Number(currencyList[name].closing_price);
    const fluctatePrice = Math.round((currentPrice - yesterdayPrice) * 100) / 100;
    const fluctateRate = Math.round((fluctatePrice / yesterdayPrice) * 10000) / 100;
    if (type === 'krw') {
      return fluctatePrice;
    }
    if (type === 'rate') {
      return fluctateRate;
    }
  };

  const renderHeaderChart = () => {
    const keys = Object.keys(currencyList).splice(0, 5);
    // getData('BTC');
    return (
      <header className={styles.header_wrap}>
        <div className={styles.header_title}>{'원화마켓 메이저 TOP5'}</div>
        <div className={styles.header_chart_container}>
          {keys.map((name, i) => {
            const currentPrice = currencyList[name].closing_price;
            const dayToDayFluctateRate = getDayToDayFluctate(name, 'rate');
            return (
              <div
                key={i}
                className={styles.header_chart_wrap}
                style={i === 0 ? { paddingLeft: 0 } : i === keys.length - 1 ? { paddingRight: 0 } : {}}>
                <div className={styles.coin_title}>{coinNameKR[name]}</div>
                <div
                  className={styles.coin_price}
                  style={
                    Math.sign(Number(dayToDayFluctateRate)) === 1
                      ? { color: '#F75467' }
                      : Math.sign(Number(dayToDayFluctateRate)) === 0
                      ? { color: '#282828' }
                      : { color: '#4386F9' }
                  }>
                  {costComma(currentPrice)}
                </div>
                <div
                  className={styles.coin_fluctate_rate}
                  style={
                    Math.sign(Number(dayToDayFluctateRate)) === 1
                      ? { color: '#F75467' }
                      : Math.sign(Number(dayToDayFluctateRate)) === 0
                      ? { color: '#282828' }
                      : { color: '#4386F9' }
                  }>
                  {`(${signPositiveNumber.signRatePositive(Number(dayToDayFluctateRate))} %)`}
                </div>
                <AreaChart />
              </div>
            );
          })}
        </div>
      </header>
    );
  };

  const handleClickBody = (selectedCurrency: string) => {
    router.push({ pathname: '/exchange', query: { selectedCurrency } }, undefined, { shallow: true });
  };

  const onAddFavorites = (i: number, e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    const temp: any = [...favorites];
    if (temp.length !== 0) {
      let exist = false;
      for (const k in temp) {
        if (temp[k] === i) {
          exist = true;
          if (exist) {
            temp.splice(k, 1);
          }
        }
      }
      if (exist) {
        setFavorites(temp);
        context.handleStateChange('favorites', temp);
      }
      if (!exist) {
        setFavorites((prev: any) => {
          return [...prev, i];
        });
        context.handleStateChange('favorites', [...favorites, i]);
      }
    } else {
      setFavorites([i]);
      context.handleStateChange('favorites', [i]);
    }
  };

  const onSubsFavorites = (name: string, e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    const keys = Object.keys(currencyList);
    const targetIdx = keys.indexOf(name);
    let deleteFIdx: any = null;
    const temp: any = [...favorites];
    for (const i in temp) {
      if (temp[i] === targetIdx) deleteFIdx = i;
    }
    temp.splice(deleteFIdx, 1);
    setFavorites(temp);
    context.handleStateChange('favorites', temp);
  };

  const tbodyData = () => {
    let keys = Object.keys(currencyList);
    if (query.tab === 'favorites') {
      const temp = [];
      for (let i = 0; i < keys.length; i++) {
        for (let k = 0; k < context.favorites.length; k++) {
          if (keys[i] === keys[context.favorites[k]]) temp.push(keys[i]);
        }
      }

      keys = temp;
    }

    if (searchValue) {
      keys = keys.filter((v) => v.includes(searchValue.toUpperCase()));
    }
    // const sorted = keys.map((v) => currencyList[v].acc_trade_value_24H).sort((a, b) => a - b);
    if (Math.ceil(keys.length / 30) !== totalPage) {
      setTotalPage(Math.ceil(keys.length / 30));
    }
    return keys.map((name, i) => {
      const currentPrice = currencyList[name].closing_price;
      // const fluctate = currencyList[name].fluctate_24H;
      // const fluctateRate = currencyList[name].fluctate_rate_24H;
      const accTradeValue = currencyList[name].acc_trade_value_24H;
      const dayToDayFluctate = getDayToDayFluctate(name, 'krw');
      const dayToDayFluctateRate = getDayToDayFluctate(name, 'rate');
      const nameKR: string = coinNameKR[name];
      if (name === 'date') {
        return;
      }
      return (
        <tr key={i} className={styles.table_row} ref={tableRef} onClick={() => handleClickBody(name)}>
          <td style={{ width: '25px' }}>
            <div style={{ alignItems: 'center' }}>
              {query.tab === 'krw' && (
                <div className={styles.table_favorite} onClick={(e: any) => onAddFavorites(i, e)}>
                  {favorites.includes(i) ? (
                    <Image src="/images/star.png" alt="Favorite Image" width={14} height={14} />
                  ) : (
                    <Image src="/images/star_empty.png" alt="Favorite Empty Image" width={14} height={14} />
                  )}
                </div>
              )}
              {query.tab === 'favorites' && (
                <div onClick={(e: any) => onSubsFavorites(name, e)}>
                  <Image src="/images/star.png" alt="Favorite Image" width={14} height={14} />
                </div>
              )}
            </div>
          </td>
          <td className={styles.table_asset_row}>
            {/* <div style={{ alignItems: 'center' }}> */}
            <div style={{ fontSize: '15px' }}>{nameKR}</div>
            <div style={{ fontSize: '12px', color: '#a4a4a4' }}>{`${name} / KRW`}</div>
            {/* </div> */}
          </td>
          <td style={{ width: '161px', padding: '0 13px', fontSize: '14px' }}>{`${costComma(currentPrice)} 원`}</td>
          <td
            style={
              Math.sign(Number(dayToDayFluctateRate)) === 1
                ? { color: '#F75467', width: '262px', padding: '0 24px 0 15px', fontSize: '14px' }
                : Math.sign(Number(dayToDayFluctateRate)) === 0
                ? { color: '#282828', width: '262px', padding: '0 24px 0 15px', fontSize: '14px' }
                : { color: '#4386F9', width: '262px', padding: '0 24px 0 15px', fontSize: '14px' }
            }>
            <span>{`${signPositiveNumber.signPricePositive(Number(dayToDayFluctate))} 원 `}</span>
            <span>{`(${signPositiveNumber.signRatePositive(Number(dayToDayFluctateRate))} %)`}</span>
          </td>
          <td style={{ width: '192px', padding: '0 13px', fontSize: '14px' }}>{`${costComma(
            Math.round(Number(accTradeValue))
          )} 원`}</td>
          <td style={{ width: '65px', textAlign: 'center', paddingLeft: '23px' }}>입금</td>
          <td style={{ width: '44px', textAlign: 'center' }}>입금</td>
          <td style={{ width: '44px', textAlign: 'center' }}>입금</td>
          <td style={{ width: '65px', textAlign: 'center', paddingRight: '23px' }}>입금</td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>BITRADER | Cryptocurrency Trading Platform</title>
        <meta name="Bithumb" content="Home" />
        <link rel="icon" href="/candlestick.png" />
      </Head>
      <Nav setItem={(key: string) => setNavigation(key)} default={'home'} />
      {renderHeaderChart()}
      <div className={styles.contents_wrap}>
        <div className={styles.table_header_wrap}>
          <Tab
            tabs={{
              tabItems: [
                { key: 'krw', label: '원화 마켓', onClick: () => moveTab('krw') },
                { key: 'favorites', label: '즐겨 찾기', onClick: () => moveTab('favorites') },
              ],
              selectedTab: query.tab,
            }}
            contentsStyle={{ width: '260px', fontSize: '20px' }}
          />
          <Input
            type="text"
            placeholder="검색"
            className={styles.input_style}
            maxLength={12}
            handleChange={(value: string) => handleChange(value)}
            propValue={searchValue}
            clearButton="on"
          />
        </div>
        <Table
          theadWidth={[222, 161, 262, 192, 65, 44, 44, 65]}
          theadTextAlign={['left', 'right', 'right', 'right', 'center', 'center', 'center', 'center']}
          theadPadding={['0 0 0 30px', '0 13px', '0 24px 0 13px', '0 13px', '0 0 0 23px', '0', '0', '0 23px 0 0']}
          theadData={['자산', '실시간 시세', '변동률 (전일대비)', '거래금액(24H)', '입금', '출금', '차트', '거래']}
          tbodyData={tbodyData()}
          tbodyStyle={{ fontSize: '14px', fontWeight: 400 }}
          emptyTable={{
            text: '검색된 가상자산이 없습니다',
            style: { fontSize: '13px', textAlign: 'center', padding: '20px' },
          }}
          tableStyle={{ width: '1200px', maxHeight: '1073px', justifyItems: 'center' }}
          // tbodyStyle={{ height: '975px', overflowY: 'auto' }}
        />
      </div>
      <footer className={styles.footer}>{'footer'}</footer>
    </div>
  );
};

export default Home;
