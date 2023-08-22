// import Button from "src/app/components/app/generic/Button";
// import IconButton from "src/app/components/app/generic/IconButton";
// import { Link } from "src/app/components/app/generic/Link";
// import ShowSidebarbutton from "src/app/components/app/generic/ShowSidebarButton";
// import CudaPagesIcon from "src/app/components/app/icons/CudaPagesIcon";
import { CapitalizeFirstLetters } from "libs/shared/helpers";
import Head from "next/head";
import { ReactNode, useContext, useEffect, useState } from "react";
import {
	HiAnnotation,
	HiChevronDown,
	HiChevronRight,
	HiExternalLink,
	HiEye,
	HiLightningBolt,
} from "react-icons/hi";
// import { DashboardContext } from "../../providers/projectDashboardProvider";

// import DashboardSidebar from "../DashboardSidebar";
import { BreadcrumbProps } from "../generic/Breadcrumb";
import Breadcrumbs from "../generic/Breadcrumbs";
// import { DashboardNavbar } from "../NavBar/DashboardNavbar";
// import {
// DetailModal,
// TDetail,
// TDetailTabs,
// } from "src/app/components/app/crm/components/DetailModal";
// import { useAppDispatch, useAppSelector } from "../../lib/redux/store";
// import {
// SelectHotkeysState,
// SetHotkeysPreviousKey,
// TDetailModalProps,
// } from "client-app/lib/redux/reducers/modals.reducer";
// import GlobalCommandPalette from "src/app/components/app/crm/components/CommandPalette/GlobalCommandPalette";
// import { MixpanelRegisterProject } from "../../lib/analytics/mixpanel";
// import { UserContext } from "../../providers/userProvider";
// import Cookies from "js-cookie";
// import { SetProjectIdCookie } from "../../lib/server/server.auth";
// import { useAsync } from "react-async-hook";
import { Link } from "../generic/Link";
import IconButton from "../generic/IconButton";
import Button from "../generic/Button";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

export type ProjectDashboardViewStates =
	| "home"
	| "links"
	| "social-media-profiles"
	| "team"
	| "links-appearance"
	| "analytics"
	| "general";

export type TLayout = "default" | "focus" | "raw-dog";

export interface DashboardLayoutContainerProps {
	urlExtension?: string;
	children: ReactNode;
	showBreadcrumbs?: boolean;
	layout?: TLayout;
	data?: any;
}

const DashboardLayoutContainer = ({
	urlExtension,
	children,
}: DashboardLayoutContainerProps) => {
	return (
		<>
			<div className="h-screen flex flex-col">
				<div className="flex flex-col-reverse md:flex-col">
					<DashboardNavbar />
				</div>

				<div className="w-screen flex flex-grow overflow-auto">
					<div className="h-full flex w-full relative">
						<DashboardSidebar />
						<div
							className="overflow-auto md:ml-16 2xl:ml-56 w-full h-full"
							id="#dashboard-content"
						>
							<>
								<Head>
									<title>{`${"Company Name"} | Barracuda`}</title>
								</Head>
								{<>{children}</>}
							</>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardLayoutContainer;
