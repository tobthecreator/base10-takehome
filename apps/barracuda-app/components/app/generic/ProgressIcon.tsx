import Tippy from "@tippyjs/react";
import React, { ReactNode } from "react";

const cleanPercentage = (percentage) => {
	const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
	const isTooHigh = percentage > 100;
	return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const ProgressIcon = ({
	percentage,
	bgColor = "#E2E8F0",
	progressColor = "currentColor",
	className,
	tooltip,
}: {
	percentage: number;
	bgColor?: string;
	progressColor?: string;
	className?: string;
	tooltip?: string | ReactNode;
}) => {
	const p = cleanPercentage(percentage);
	const icon = (
		<div className={`${className}`}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={"1em"}
				height={"1em"}
				viewBox="0 0 20 20"
				className={`w-full h-full text-inherit -rotate-90`}
			>
				<Circle color={bgColor} />
				{p > 0 && <Circle color={progressColor} percent={p} />}
			</svg>
		</div>
	);
	return tooltip ? (
		<Tippy
			theme="cuda"
			content={
				<span className="max-w-sm shadow-xl font-semibold text-slate-150 tracking-wide text-xs">
					{tooltip}
				</span>
			}
			placement="bottom"
			offset={[0, 6]}
			arrow={false}
			delay={200}
		>
			{icon}
		</Tippy>
	) : (
		icon
	);
};

const Circle = ({
	percent = 100,
	color,
}: {
	percent?: number;
	color: string;
}) => {
	const r = 7;
	const cir = 2 * Math.PI * r;
	const strokePercent = ((100 - percent) * cir) / 100;

	return (
		<circle
			r={r}
			cx={10}
			cy={10}
			fill="none"
			stroke={strokePercent !== cir ? color : ""}
			strokeWidth={"2"}
			strokeDasharray={cir}
			strokeDashoffset={percent ? strokePercent : 0}
			strokeLinecap="round"
		></circle>
	);
};
export default ProgressIcon;
