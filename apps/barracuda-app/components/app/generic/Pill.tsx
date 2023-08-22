import React from "react";

function Pill({
	children,
	color,
	textSize,
	padding,
	className,
}: {
	children: React.ReactFragment;
	color?: string;
	textSize?: string;
	padding?: string;
	className?: string;
}) {
	const c = color || "bg-sky-600/10 text-sky-600";
	const ts = textSize || "text-[10px]";
	const p = padding || "py-px px-2";

	return (
		<div
			className={`font-semibold tracking-widest rounded-lg ${ts} ${p} ${c} ${className}`}
		>
			{children}
		</div>
	);
}

export default Pill;
