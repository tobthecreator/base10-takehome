import Tippy from "@tippyjs/react";
import Tooltip from "./Tooltip";
import { TSizeOptions } from "libs/shared/interfaces";
import React, { ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset";
type ButtonColor =
	| "primary"
	| "secondary"
	| "outline"
	| "ghost"
	| "dashed"
	| "dark"
	| "light"
	| "danger"
	| "minimal";

export interface ButtonProps {
	type?: ButtonType;
	size?: TSizeOptions;
	icon?: ReactNode;
	iconPosition?: "left" | "right";
	color?: ButtonColor;
	disabled?: boolean;
	loading?: boolean;
	loader?: ReactNode;
	children: ReactNode;
	onClick?: (e: any) => void;
	className?: string;
	tooltip?: string | ReactNode;
	hotkeys?: string[];
}

export const Button = React.forwardRef(
	(
		{
			type = "button",
			size = "default",
			icon,
			iconPosition = "left",
			color = "primary",
			disabled = false,
			loading = false,
			loader,
			children,
			onClick,
			className,
			tooltip,
			hotkeys,
		}: ButtonProps,
		ref
	) => {
		const getPaddingFromSize = (size: TSizeOptions): string => {
			switch (size) {
				case "xs":
					return "px-2 py-1";
				case "small":
					return "px-4 py-2";

				case "default":
					return "px-6 py-3";
				case "large":
					return "px-8 py-4";
				default:
					return size;
			}
		};

		const getColor = (color: ButtonColor, disabled): string => {
			if (disabled) {
				let val = "text-slate-400 cursor-not-allowed";
				switch (color) {
					case "primary":
					case "secondary":
					case "dark":
					case "danger":
						return [val, "bg-slate-200"].join(" ");
					case "outline":
						return [val, "border border-slate-300"].join(" ");
					case "ghost":
						return val;
					case "minimal":
						return val;
					default:
						return "";
				}
			}

			switch (color) {
				case "minimal":
					return "text-slate-500 hover:text-slate-600 hover:bg-slate-100 rounded-md font-semibold";
				case "primary":
					return "text-slate-50 bg-cuda-500 hover:bg-cuda-600";
				case "secondary":
					return "text-slate-100 bg-sky-700 hover:bg-sky-900";
				case "dark":
					return "text-slate-100 bg-slate-900 hover:bg-slate-800";
				case "outline":
					return "text-slate-600 hover:text-slate-900 outline-0 border border-slate-300 shadow-sm hover:bg-slate-100 hover:border-slate-400";
				case "dashed":
					return "text-slate-600 hover:text-slate-900 outline-0 border border-dashed border-slate-300 shadow-sm hover:bg-slate-100 hover:border-slate-400";
				case "ghost":
					return "text-cuda-500 outline-0 hover:text-cuda-700";
				case "light":
					return "text-slate-600 bg-slate-100 hover:text-cuda-500 hover:bg-slate-200";
				case "danger":
					return "text-slate-50 bg-rose-600 hover:bg-rose-800 border border-rose-600 hover:border-rose-800";
				default:
					return "";
			}
		};

		const p = getPaddingFromSize(size);
		const c = getColor(color, disabled);
		const textSize = ["small", "xs"].includes(size)
			? "text-sm"
			: "text-sm sm:text-base font-semibold";

		const buttonElement = (
			<button
				type={type}
				disabled={disabled}
				className={`inline-flex flex-row justify-center items-center grow-0 ${p} ${c} ${textSize} rounded-md focus:ring-1 ${className}`}
				onClick={onClick}
				ref={ref as React.Ref<HTMLButtonElement>}
			>
				{loading === true ? (
					<>{loader}</>
				) : (
					<>
						{icon && iconPosition === "left" && (
							<div
								className={`-ml-0.5 flex-none ${
									size === "xs" ? "mr-1" : "mr-2"
								}`}
								aria-hidden="true"
							>
								{icon}
							</div>
						)}

						{children}
						{icon && iconPosition === "right" && (
							<div
								className={`flex-none ${
									size === "xs" ? "ml-1" : "ml-2"
								} -mr-0.5`}
								aria-hidden="true"
							>
								{icon}
							</div>
						)}
					</>
				)}
			</button>
		);

		return tooltip ? (
			<Tippy
				theme="none"
				content={<Tooltip tooltip={tooltip} hotkeys={hotkeys} />}
				placement="bottom"
				offset={[0, 4]}
				arrow={false}
				delay={400}
				touch={"hold"}
			>
				{buttonElement}
			</Tippy>
		) : (
			buttonElement
		);
	}
);

export default Button;
