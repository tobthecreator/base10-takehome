import { Transition } from "@headlessui/react";
import { useState, ReactNode, useEffect } from "react";
import { HiChevronRight, HiExternalLink } from "react-icons/hi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "../generic/Link";

const Wrapper = ({
	children,
	hasDropdownChildren,
	parentHref,
}: {
	children: ReactNode;
	hasDropdownChildren: boolean;
	parentHref?: string;
}) => {
	return parentHref && !hasDropdownChildren ? (
		<Link href={parentHref} className={`w-full `}>
			{children}
		</Link>
	) : (
		<>{children}</>
	);
};

export const DashboardSidebarButton = ({
	parentText,
	parentIcon,
	parentHref,
	parentActive = false,
	comingSoon = false,
	paywalled = false,
	useAsButton,
	onClick,
	dropdownChildren,
}: {
	parentText: string;
	parentIcon: ReactNode;
	parentHref?: string;
	parentActive?: boolean;
	comingSoon?: boolean;
	useAsButton?: boolean;
	onClick?: () => void;
	paywalled?: boolean;
	dropdownChildren?: {
		text: string;
		href: string;
		external: boolean;
		active: boolean;
		disabled?: boolean;
		icon: ReactNode;
	}[];
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const hasDropdownChildren =
		(dropdownChildren && dropdownChildren.length > 0) ?? false;

	// if this dropdown contains an active child, start it open (you can still close it no prob)
	useEffect(() => {
		if (dropdownChildren?.some((child) => child.active)) {
			setOpen(true);
		}
	}, []);

	const parentActiveStyle = parentActive
		? "text-cuda-500 font-semibold"
		: "text-slate-500";

	if (comingSoon) {
		return (
			<Tippy
				theme={`cuda`}
				placement="right"
				// disabled={"Coming soon!"}
				content={<span className="px-1">Coming Soon!</span>}
				delay={250}
				moveTransition="transform 0.2s opacity 0.2s ease-in-out"
				arrow={true}
			>
				<div
					className={`flex items-center gap-x-2 text-slate-400 font-semibold  px-2 text-sm`}
				>
					<div className="">{parentIcon}</div>
					<div className="md:hidden 2xl:inline-flex group-hover/sidebar:md:inline-flex">
						{parentText}
					</div>
				</div>
			</Tippy>
		);
	}

	if (paywalled) {
		return (
			<Tippy
				theme={`cuda`}
				placement="bottom"
				content={
					<Link newTab href="/crm">
						Tell me more!
					</Link>
				}
				delay={250}
				moveTransition="transform 0.2s opacity 0.2s ease-in-out"
				arrow={true}
				interactive
			>
				<div
					className={`flex items-center gap-x-2 text-slate-400 font-semibold py-2 px-2 text-sm`}
				>
					<div className="">{parentIcon}</div>
					<div className="md:hidden 2xl:inline-flex group-hover/sidebar:md:inline-flex">
						{parentText}
					</div>
				</div>
			</Tippy>
		);
	}

	if (useAsButton) {
		return (
			<div className={`cursor-pointer`}>
				<div
					onClick={onClick}
					className="h-8 text-sm cursor-pointer text-slate-600 font-semibold flex flex-row items-center w-full justify-between bg-transparent hover:bg-slate-200  px-2 rounded-lg transition-all duration-50 ease-out"
				>
					<div className={`flex items-center gap-x-2 ${parentActiveStyle}`}>
						<div className="">{parentIcon}</div>
						<div className="md:hidden 2xl:inline-flex group-hover/sidebar:md:inline-flex">
							{parentText}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="cursor-pointer">
			<Wrapper
				parentHref={parentHref}
				hasDropdownChildren={hasDropdownChildren}
			>
				<div className={`cursor-pointer`}>
					<div
						onClick={() => {
							if (!dropdownChildren) return;
							setOpen(!open);
						}}
						className="h-8 text-sm cursor-pointer text-slate-600 font-semibold min-w-0 flex flex-row items-center w-full justify-between bg-transparent hover:bg-slate-200  px-2 rounded-lg transition-all duration-50 ease-out"
					>
						<div
							className={`flex items-center gap-x-2 min-w-0 ${parentActiveStyle}`}
						>
							<div className="">{parentIcon}</div>
							<div className="md:hidden 2xl:inline-flex group-hover/sidebar:md:inline-flex truncate">
								{parentText}
							</div>
						</div>
						{hasDropdownChildren && (
							<HiChevronRight
								className={`w-5 h-5 flex-none flex opacity-100 md:opacity-0 group-hover/sidebar:md:opacity-100 transition-all duration-200 ease-in-out ${
									open ? "rotate-90" : "rotate-0"
								}`}
							/>
						)}
					</div>
				</div>
			</Wrapper>

			{hasDropdownChildren && dropdownChildren && (
				<Transition
					show={open}
					as={"div"}
					enter="transition-all ease-in-out duration-200"
					enterFrom="opacity-0 -translate-y-2"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-out duration-150"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 -translate-y-2"
					className={`bg-slate-150 my-1 rounded-lg`}
				>
					{dropdownChildren.map((x, i) => {
						// we only pass disabled
						const disabled = x.disabled !== undefined && x.disabled === true;

						if (disabled) {
							return <></>;
						}
						const activeStyle = x.active
							? "text-cuda-500 bg-slate-200 font-semibold"
							: "text-slate-500";

						return (
							<Link
								href={x.href}
								newTab={x.external !== undefined && x.external}
								key={i}
								// onClick={() => setShowSidebar(false)}
							>
								{/*  ml-5 pl-4 */}
								<div className="px-1.5 w-full py-0.5">
									<div
										className={` h-8 text-sm cursor-pointer w-auto flex gap-2 justify-start items-center bg-transparent hover:bg-slate-200 rounded-lg  pl-1 my-1 pr-3 transition-all duration-50 ease-out ${activeStyle}`}
									>
										<div
											className={`flex-none ${
												x.active ? "text-cuda-500" : "text-slate-400"
											}`}
										>
											{x.icon}
										</div>
										<span className="md:hidden 2xl:inline-flex group-hover/sidebar:md:inline-flex truncate">
											{x.text}
										</span>
										{x.external !== undefined && x.external && (
											<HiExternalLink className="w-4 h-4 flex-none justify-self-end" />
										)}
									</div>
								</div>
							</Link>
						);
					})}
				</Transition>
			)}
		</div>
	);
};
