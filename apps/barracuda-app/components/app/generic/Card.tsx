import React, { forwardRef, ReactNode } from "react";

export type TCardBackground = "white" | "light" | "none" | string;
export interface CardProps {
	stroke?: boolean;
	padding?: boolean;
	shadow?: boolean;
	background?: TCardBackground;
	children?: ReactNode;
	className?: string;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onClick?: () => void;
	key?: number | string;
	style?: any;
	rounding?: string;
	tabIndex?: number;
}

export const Card = forwardRef(
	(
		{
			stroke = false,
			padding = true,
			shadow = false,
			background = "white",
			children,
			className,
			onMouseEnter,
			onMouseLeave,
			onClick,
			key,
			style,
			rounding = "rounded-lg",
			tabIndex,
		}: CardProps,
		ref
	) => {
		const getBackground = (background: TCardBackground): string => {
			switch (background) {
				case "white":
					return "bg-white";
				case "light":
					return "bg-slate-100";
				case "none":
					return "bg-transparent";
				default:
					return background;
			}
		};

		const getStroke = (
			stroke: boolean,
			background: TCardBackground | undefined
		): string => {
			if (!stroke) return "";

			switch (background) {
				case "white":
				case "none":
					return "border border-slate-200";
				case "light":
					return "border border-slate-300";
				default:
					return "";
			}
		};

		const p = padding ? "p-4" : "";
		const bg = getBackground(background);
		const st = getStroke(stroke, background);
		const sh = shadow ? "shadow-sm" : "";

		return (
			<div
				className={`${p} ${bg} ${st} ${sh} ${rounding} ${className}`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
				key={key}
				style={style}
				ref={ref as React.Ref<HTMLDivElement>}
				tabIndex={tabIndex}
			>
				{children}
			</div>
		);
	}
);

export default Card;
