import { Menu } from "@headlessui/react";
import Button from "./Button";
import Divider from "./Divider";
import { ReactNode } from "react";
import { Float } from "@headlessui-float/react";
import { Placement } from "tippy.js";
import type { Options as OffsetOptions } from "@floating-ui/core/src/middleware/offset";

export type MenuOption = {
	label: string;
	onClick?: (e?) => void;
	icon?: ReactNode;
	style?: "default" | "danger";
	[key: string]: any;
};

export const MenuDropdown = ({
	align = "bottom-start",
	options,
	children,
	buttonPadding = "py-1 pl-2 pr-6",
	offset,
}: {
	align?: Placement | undefined;
	options: MenuOption[];
	children?: ReactNode | ((props) => ReactNode);
	buttonPadding?: string;
	offset?: OffsetOptions;
}) => {
	const getTextColor = (style: "default" | "danger" = "default") => {
		switch (style) {
			case "danger":
				return "text-rose-500";
			case "default":
			default:
				return "text-slate-600";
		}
	};
	const getIconColor = (style: "default" | "danger" = "default") => {
		switch (style) {
			case "danger":
				return "text-rose-500";
			case "default":
			default:
				return "text-slate-400";
		}
	};

	return (
		<Menu as="div" className={`relative inline-block`}>
			{(props) => {
				return (
					<Float
						// @ts-ignore
						placement={align}
						offset={offset ?? 2}
						shift={6}
						flip={8}
						portal
						enter="transition duration-100 ease-out"
						enterFrom="opacity-0 -translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition duration-150 ease-in"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 -translate-y-1"
					>
						<Menu.Button
							as={"div"}
							//ref={setTargetElement}
							className="h-full flex items-center justify-center flex-col"
						>
							{children ? (
								typeof children === "function" ? (
									children({ ...props })
								) : (
									children
								)
							) : (
								<Button color="outline" size="xs" className="font-normal">
									Open
								</Button>
							)}
						</Menu.Button>

						<Menu.Items
							className={`mt-1 max-w-sm flex flex-col gap-px p-1 items-stretch origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
						>
							{options.map((option, index) => {
								return option.label === "Divider" ? (
									<div className="py-1" key={index}>
										<Divider />
									</div>
								) : (
									<Menu.Item key={index}>
										{({ active }) => (
											<button
												className={`${
													active
														? `${getTextColor(option.style)} bg-slate-100`
														: `${getTextColor(option.style)}`
												} ${
													active
														? `${getTextColor(option.style)} bg-slate-150`
														: `${getTextColor(option.style)}`
												}
                                                                    relative cursor-default list-none select-none ${buttonPadding} text-sm rounded-md `}
												onClick={option.onClick}
											>
												<div className="flex items-center justify-between gap-1">
													<div className={`gap-2 flex items-center`}>
														{option.icon && (
															<span className={getIconColor(option.style)}>
																{option.icon}
															</span>
														)}
														<span className={`block truncate`}>
															{option.label}
														</span>
													</div>
												</div>
											</button>
										)}
									</Menu.Item>
								);
							})}
						</Menu.Items>
					</Float>
				);
			}}
		</Menu>
	);
};

export default MenuDropdown;
