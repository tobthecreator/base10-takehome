import { AppProps } from "next/app";
import { useEffect } from "react";
import { batch } from "react-redux";
import { io } from "socket.io-client";
import {
	InitSocketAndEventSubscriptions,
	TurnOffSocketandEventSubscriptions,
} from "../../../lib/redux/visitor/visitor.sockets";
import {
	persistor,
	store,
	useAppDispatch,
} from "../../../lib/redux/visitor/visitor.store";
import { FetchTasks } from "../../../lib/redux/visitor/reducers/tasks";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

export const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
	withCredentials: true,
	transports: ["websocket"],
	upgrade: false,
});

// used for our customers
const VisitorWrapper = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		if (socket.connected) {
			sessionStorage.setItem("socketClientId", socket.id);
			return;
		} else {
			sessionStorage.removeItem("socketClientId");
		}

		return () => sessionStorage.removeItem("socketClientId");
	}, [socket.connected]);

	const dispatch = useAppDispatch();

	const fetchData = () => {
		batch(() => dispatch(FetchTasks()));
	};

	// fetch initial data, init sockets, turn off sockets later
	// TODO STARTER - turn this into a hook?
	useEffect(() => {
		// if (conditions) return;

		// TODO STARTER - move into the actions of the redux folder for the dashboard
		fetchData();
		const interval = setInterval(() => {
			fetchData();
		}, 60000 * 15); // Refresh data every 15 minutes

		InitSocketAndEventSubscriptions(socket, dispatch, "organizationId");

		return () => {
			TurnOffSocketandEventSubscriptions(socket, "organizationId", "userId");
			clearInterval(interval);
		};
	}, []);

	return (
		<>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{/* 
					We use this function syntax to address a bug in redux-persist that breaks SSR and all of our meta tags
					Reference: https://github.com/vercel/next.js/issues/8240
					*/}

					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</>
	);
};

export default VisitorWrapper;
