// import { observable, action, makeObservable } from 'mobx';
// import { enableStaticRendering, MobXProviderContext } from 'mobx-react';
// import { useMemo, useContext } from 'react';
// import { LoadingStore } from './LoadingStore';

// let store: any = null;
// const isServer = typeof window === 'undefined';
// enableStaticRendering(isServer);

// class Store {
//   loadingStore = new LoadingStore();

//   constructor() {
//     makeObservable(this);
//   }
// }

// function initializeStore(initialData = null) {
//   if (isServer) {
//     return {
//       loadingStore: new LoadingStore(),
//     };
//   }

//   if (store === null) {
//     store = {
//       loadingStore: new LoadingStore(),
//     };
//   }

//   return store;
// }

// export function useStore(initialState: any) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }
export {};
