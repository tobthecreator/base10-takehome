import Divider from "../generic/Divider";
import { DashboardSidebarButton } from "./DashboardSidebarButton";
import { HiCheckCircle, HiCog, HiUsers } from "react-icons/hi";

const DashboardSidebar = () => {
	// const currentPage = () => {
	// 	return "dashboard";
	// };

	const showSidebar = true;

	return (
		<>
			<div
				className={`${
					showSidebar
						? "absolute left-0 flex"
						: `absolute -left-56 md:left-0 2xl:left-0 flex `
				} duration-150 ease-in-out w-56 md:w-16 group/sidebar hover:md:w-56 2xl:w-56 transition-all bottom-0 h-full hover:shadow-lg hover:2xl:shadow-none z-100 2xl:z-auto 2xl:shadow-none 2xl:flex-shrink-0 bg-slate-100 border-r  border-slate-200  px-3 pt-4 pb-6 flex-col items-stretch justify-between overflow-y-auto no-scrollbar `}
			>
				<div className="flex flex-col gap-y-2 transition-all ease-in-out duration-200">
					<div className="block lg:hidden -mt-2">
						{/* <ShowSidebarbutton /> */}
						show sidebar button
					</div>

					<div className="flex items-center">company logo and name</div>

					<div className="flex flex-col gap-1 pb-4">
						<div className="h-8 flex md:hidden 2xl:flex group-hover/sidebar:md:flex items-center gap-2 text-slate-400 text-xs tracking-wide font-semibold px-2 pt-3 pb-1">
							Section Header
						</div>
						<div className="hidden md:flex items-center 2xl:hidden group-hover/sidebar:md:hidden px-2 h-8">
							<Divider
								size="full"
								borderColor="border-slate-200"
								className="my-0"
							/>
						</div>
						<DashboardSidebarButton
							parentText="Tasks"
							parentIcon={
								<HiCheckCircle className="w-[18px] h-[18px] flex-none" />
							}
							parentHref={`/dashboard/tasks`}
							parentActive={false}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-1 w-full pb-1 mt-12">
					<>
						<div className="h-8 flex md:hidden 2xl:flex group-hover/sidebar:md:flex items-center gap-2 text-slate-400 text-xs tracking-wide font-semibold px-2 pt-3 pb-1">
							Organization
						</div>
						<div className="hidden md:flex items-center 2xl:hidden group-hover/sidebar:md:hidden px-2 h-8">
							<Divider
								size="full"
								borderColor="border-slate-200"
								className="my-0"
							/>
						</div>
						<DashboardSidebarButton
							parentText="Settings"
							parentIcon={<HiCog className="w-[18px] h-[18px] flex-none" />}
							parentHref={`/dashboard/settings`}
							parentActive={false}
						/>
						<DashboardSidebarButton
							parentText="Members"
							parentIcon={
								<HiUsers className="w-[18px] h-[18px] flex-none -rotate-6" />
							}
							parentHref={`/dashboard/members`}
							parentActive={false}
						/>
					</>
				</div>
			</div>
		</>
	);
};

export default DashboardSidebar;
