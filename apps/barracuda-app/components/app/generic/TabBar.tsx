import { Menu, Transition } from "@headlessui/react";
import Badge from "./Badge";
import IconButton from "./IconButton";
import { Fragment, ReactNode } from "react";
import { HiChevronDown } from "react-icons/hi";

export interface ITab {
	label: string;
	id: string;
	count?: Number;
	emphasizeCount?: boolean;
}

export interface TabProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
	onActiveClick?: () => void; // add a secondary onclick if the tab is currently active
	className?: string;
	count?: string | Number;
	emphasizeCount?: boolean;
	children?: ReactNode | ((props) => ReactNode);
}

export function Tab({
	label,
	isActive,
	onClick,
	onActiveClick,
	className,
	count,
	emphasizeCount = false,
	children,
}: TabProps) {
	const getTextColor = (isActive: boolean) => {
		return isActive ? "text-cuda-500" : "text-slate-400 hover:text-cuda-500";
	};

	const getBottomBorder = (isActive: boolean) => {
		return isActive ? "border-cuda-500" : "";
	};

	const t = getTextColor(isActive);
	const b = getBottomBorder(isActive);

	return (
		<div
			className="h-full relative cursor-pointer flex flex-col justify-center"
			onClick={isActive ? (onActiveClick ? onActiveClick : onClick) : onClick}
		>
			{children ? (
				typeof children === "function" ? (
					children({ isActive })
				) : (
					children
				)
			) : (
				<div
					className={`font-semibold text-sm py-1 relative whitespace-nowrap px-2 -mx-2 rounded-md flex items-stretch gap-2 ${
						isActive
							? `text-slate-900  ${onActiveClick && "hover:bg-slate-150"}`
							: "text-slate-400 hover:bg-slate-100"
					} ${className}`}
				>
					<span>{label}</span>
					{count && (
						<Badge
							style={emphasizeCount ? "cuda" : "default"}
							size="xs"
							className={
								emphasizeCount
									? "opacity-100"
									: !isActive
									? "opacity-60"
									: "opacity-100"
							}
						>
							{count.toString()}
						</Badge>
					)}
				</div>
			)}
			{isActive && (
				<div
					className={`${b} absolute bottom-0 left-0 right-0 w-full h-1  bg-cuda-500 rounded-full`}
				/>
			)}
		</div>
	);
}

interface TabBarProps {
	children: ReactNode;
	noBorder?: boolean;
	className?: string;
	showDropdown?: boolean;
	tabs?: ITab[];
	setCurrentTab?: (tab: any) => void;
	currentTabId?: string;
	id?: string;
}

export function TabBar({
	children,
	noBorder = false,
	className = "",
	showDropdown = false,
	tabs,
	setCurrentTab,
	currentTabId,
	id,
}: TabBarProps) {
	return (
		<div
			className={`flex items-center min-w-0  ${
				noBorder ? "border-none" : "border-b border-slate-200"
			}  ${className}`}
		>
			<div
				className="flex min-w-0 items-stretch sm:pl-4 sm:-ml-4 sm:pr-6 h-full text-base sm:justify-start gap-x-4 sm:gap-x-8  overflow-x-auto no-scrollbar "
				aria-label="Tabs"
				id={id}
			>
				{children}
			</div>
			{showDropdown && tabs && tabs.length > 1 && (
				<Menu as="div" className={`relative inline-block overflow-visible`}>
					{({ open }) => (
						<>
							<Menu.Button as={Fragment}>
								<IconButton
									icon={<HiChevronDown />}
									className={`flex-none ${open ? "bg-slate-150" : ""}`}
									size="small"
									tooltip={!open ? "View all" : null}
								/>
							</Menu.Button>

							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="opacity-0 -translate-y-2"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-75"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 -translate-y-2"
							>
								<Menu.Items className="absolute right-0 mt-1 max-w-xs w-max origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-150">
									<div className="px-1 py-1 ">
										{tabs.map((t, index) => {
											return (
												<Menu.Item as={Fragment} key={index}>
													{({ active }) => (
														<button
															className={`${
																currentTabId && currentTabId === t.id
																	? "bg-slate-100 text-slate-900 font-semibold"
																	: "text-slate-600"
															} group flex w-full text-left items-center rounded-md pl-3 pr-6 py-2 text-sm hover:bg-slate-100`}
															onClick={
																setCurrentTab
																	? () => setCurrentTab(t.id)
																	: () => null
															}
														>
															<>
																<span>{t.label}</span>
																{t.count && t.count > 0 ? (
																	<span className="text-slate-400 ml-1">
																		{`(${t.count})`}
																	</span>
																) : null}
															</>
														</button>
													)}
												</Menu.Item>
											);
										})}
									</div>
								</Menu.Items>
							</Transition>
						</>
					)}
				</Menu>
			)}
		</div>
	);
}
