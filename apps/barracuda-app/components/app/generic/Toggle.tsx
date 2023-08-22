import { Switch } from "@headlessui/react";
import Tippy from "@tippyjs/react";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Toggle({
	enabled,
	onToggle,
	disabled = false,
	tooltip,
}: {
	disabled?: boolean;
	enabled: boolean;
	tooltip?: any;
	onToggle: (newState: boolean) => void;
}) {
	const toggle = (
		<Switch
			checked={enabled}
			disabled={disabled}
			onChange={() => onToggle(!enabled)}
			className={classNames(
				enabled ? "bg-cuda-500" : "bg-slate-300",
				disabled ? "cursor-default" : "cursor-pointer",
				"relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-offset-2 focus:ring-0"
			)}
		>
			<span className="sr-only">Toggle</span>
			<span
				aria-hidden="true"
				className={classNames(
					enabled ? "translate-x-5" : "translate-x-0",
					"pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
				)}
			/>
		</Switch>
	);
	return tooltip ? (
		<Tippy
			theme="cuda"
			content={
				<span className="rounded-lg max-w-sm shadow-xl font-semibold text-slate-150 tracking-wide text-xs">
					{tooltip}
				</span>
			}
			placement="bottom"
			offset={[0, 6]}
			arrow={false}
			delay={200}
		>
			{toggle}
		</Tippy>
	) : (
		toggle
	);
}
