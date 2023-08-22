import React, { ReactNode } from "react";

const Tooltip = ({
	tooltip,
	hotkeys,
}: {
	tooltip: string | ReactNode;
	hotkeys?: string[];
}) => {
	return (
		<span
			className={`bg-slate-900 rounded-md min-h-[1.5rem] ${
				hotkeys && hotkeys.length > 1 ? "px-px" : "px-2"
			} py-1 max-w-sm flex gap-1 items-center shadow-xl font-semibold text-slate-150 tracking-wide text-xs`}
		>
			<span>{tooltip}</span>
			{hotkeys && (
				<div className="flex items-center gap-1">
					<span>-</span>
					{hotkeys.map((hk, index) => {
						return (
							<div
								key={index}
								className="text-xs rounded-sm bg-slate-100 text-slate-600 px-1 py-px"
							>
								{hk}
							</div>
						);
					})}
				</div>
			)}
		</span>
	);
};

export default Tooltip;
