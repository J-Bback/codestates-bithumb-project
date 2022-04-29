# codestates-bithumb-project

#### 1. 완성된 GIF 파일 및 배포 링크
[실습영상.gif.zip](https://github.com/J-Bback/codestates-bithumb-project/files/8590257/gif.zip)

수리중...

#### 2. 프로젝트 실행 방법

```bash
yarn install

yarn run dev
```

#### 3. 사용한 스택 목록

- React, React-hooks, SCSS
- Next.js, TypeScript

#### 4. 구현한 기능 목록 (Software Requirement Specification)

***재사용 가능한 기능***
- Input, CandleStick Chart, Market Fluctate Chart, Navigation Bar, Table, Tab

***세부적인 기능***
- 즐겨찾기 기능(홈, 거래소 페이지 간 공유)
- 다양한 차트 라이브러리를 이용하여 구현
- 암호화폐의 한글이름 및 심볼 검색기능
- 거래소 뷰 > 원화마켓의 암호화폐 클릭 시 차트 및 화면 전환

#### 나를 힘들게 만든 스택
- TypeScript의 Type Error
=> 잘 안되는 부분은 로직 구현 후에 Type 지정.
- Next.js의 배포과정
=> 404 not found
원인: 
***1. Directory 구조 (assets), 이미지 로드 실패***
***2. Dynamic Routing***
***3. Webpack 설정***

혹시 배포 관련해서 이미지 로딩에 실패한 경험이 있으신 분 ?

#### 5. 구현 방법 및 구현하면서 어려웠던 점

- 1주차에 차트 라이브러리를 생각대로 커스텀하기가 어려웠음. (chart.js, react-chart-js2, highCharts, apexCharts, d3, ...)
- Atomic Design Pattern을 적용하여 구현하였는데, 재사용성을 염두하다보니 시간이 오래 걸렸음.
- 


#### 6. 성능 최적화에 대해서 고민하고 개선한 방법 (UX)

- 중복되는 패턴을 컴포넌트로 분리하여 중복 제거.

#### 7. UI 개선

- SCSS의 mixin과 variables를 사용하여 모듈화함으로써, 변경을 용이하게 함.
- 최초 어드민스러운 UI 개선 -> 현재 UI
- 레퍼런스 앱(빗썸, cleva.io 등)을 참조하여 UI를 구현.
