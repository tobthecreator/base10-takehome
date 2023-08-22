import Tippy from "@tippyjs/react";
import { TSizeOptions } from "libs/shared/interfaces";
import React, { ReactNode } from "react";

const Badge = ({
	style = "default",

	size = "default",
	rounding = "default",
	children,
	tooltip,
	className,
}: {
	style?: "default" | "outline" | "sky" | "teal" | "cuda" | "ghost";

	size?: TSizeOptions | string;
	rounding?: "default" | "large" | "full";
	className?: string;
	children: ReactNode;
	tooltip?: any;
}) => {
	const getStyle = () => {
		switch (style) {
			case "cuda":
				return "text-cuda-600 bg-cuda-600/10 border border-transparent";
			case "sky":
				return "bg-sky-600/10 text-sky-600 border border-transparent";
			case "teal":
				return "bg-teal-500/10 text-teal-600 border border-transparent";
			case "outline":
				return "text-slate-600 border border-slate-200";
			case "default":
				return "text-slate-600 bg-slate-100 border border-transparent";
			case "ghost":
				return "text-slate-500 bg-transparent border border-transparent";
			default:
				return "";
		}
	};
	const getSize = () => {
		switch (size) {
			case "xs":
				return "text-xs tracking-wide py-px px-1";
			case "small":
				return "text-sm py-1 px-2";
			case "large":
				return "text-base py-1 px-3";
			case "default":
				return "text-sm py-1 px-2";
			default:
				return size;
		}
	};
	const getRounding = () => {
		switch (rounding) {
			case "full":
				return "rounded-full";
			case "large":
				return "rounded-lg";
			case "default":
				return "rounded-md";
			default:
				return rounding;
		}
	};

	const renderBadge = () => {
		return (
			<span
				className={`flex gap-2 items-center min-w-0 truncate ${getSize()} ${getRounding()} ${getStyle()} ${className}`}
			>
				{children}
			</span>
		);
	};
	return tooltip ? (
		<Tippy
			theme="cuda"
			content={
				<span className="max-w-xs shadow-xl font-semibold text-slate-150 tracking-wide text-xs">
					{tooltip}
				</span>
			}
			placement="auto"
			offset={[0, 6]}
			arrow={false}
			delay={400}
		>
			{renderBadge()}
		</Tippy>
	) : (
		renderBadge()
	);
};

export default Badge;
