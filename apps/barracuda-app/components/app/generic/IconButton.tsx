import Tippy from "@tippyjs/react";
import Tooltip from "./Tooltip";
import React from "react";
import { ReactNode, forwardRef } from "react";

export const IconButton = forwardRef(
	(
		{
			icon,
			style = "default",
			onClick,
			disabled = false,
			className,
			tooltip,
			hotkeys,
			size = "default",
			iconColor,
			tabIndex,
		}: {
			icon: ReactNode;
			style?: "default" | "outline" | "grey" | "none";
			onClick?: (e: any) => void;
			disabled?: boolean;
			className?: string;
			tooltip?: string | ReactNode;
			hotkeys?: string[];
			size?: "small" | "default" | string;
			iconColor?: string;
			tabIndex?: number;
		},
		ref
	) => {
		const getStyles = () => {
			switch (style) {
				case "default":
				default:
					return `hover:bg-slate-150 ${
						iconColor ? iconColor : "text-slate-500 hover:text-slate-900"
					} rounded-lg`;
				case "outline":
					return `bg-slate-50 border border-slate-300 text-slate-500 hover:bg-slate-200 hover:text-slate-900 hover:border-slate-400 rounded-lg`;
				case "grey":
					return `bg-slate-50 border-2 border-slate-300 text-slate-500 hover:bg-white hover:text-slate-900 hover:border-slate-400 rounded-lg`;
				case "none":
					return ``;
			}
		};
		const getSizes = () => {
			switch (size) {
				case "default":
					return `p-2`;
				case "small":
					return `p-1.5`;
				default:
					return size;
			}
		};
		return tooltip ? (
			<Tippy
				theme="none"
				content={<Tooltip tooltip={tooltip} hotkeys={hotkeys} />}
				placement="bottom"
				offset={[0, 6]}
				arrow={false}
				delay={200}
				touch={"hold"}
			>
				<button
					disabled={disabled}
					tabIndex={tabIndex}
					ref={ref as React.Ref<HTMLButtonElement>}
					className={`group w-max h-min ${getStyles()} ${getSizes()} ${className}`}
					onClick={onClick}
				>
					{icon}
				</button>
			</Tippy>
		) : (
			<button
				disabled={disabled}
				tabIndex={tabIndex}
				ref={ref as React.Ref<HTMLButtonElement>}
				className={`group ${getStyles()} ${getSizes()} ${className}`}
				onClick={onClick}
			>
				{icon}
			</button>
		);
	}
);

export default IconButton;
