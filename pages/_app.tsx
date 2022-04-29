import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { Provider } from 'mobx-react';
// import { useStore } from "./stores";
import { MainContext } from "../context/Context";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	// const store = useStore(pageProps);

	const _handleStateChange = (state: string, value: any): void => {
		setData((prevState: any) => {
			return {
				...prevState,
				[state]: value,
			};
		});
	};

	const [data, setData] = useState<any>({
		handleStateChange: _handleStateChange,
		favorites: [],
	});

	return (
		<MainContext.Provider value={data}>
			<Component {...pageProps} />
		</MainContext.Provider>
	);
}

export default MyApp;
