import type { NextPage } from "next";
import Home from "./Home";
import { useEffect } from "react";
import { useRouter } from "next/router";

const App: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/Home");
	}, []);

	return <Home />;
};

export default App;
