import { useEffect } from "react";
import { batch } from "react-redux";
import { io } from "socket.io-client";
import {
	InitSocketAndEventSubscriptions,
	TurnOffSocketandEventSubscriptions,
} from "./dashboard.sockets";
import { useAppDispatch } from "./dashboard.store";
import { FetchTasks } from "./reducers/tasks";

export const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
	withCredentials: true,
	transports: ["websocket"],
	upgrade: false,
});

const DashboardSynchronizer = () => {
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

	return <></>;
};

export default DashboardSynchronizer;
