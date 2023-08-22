import Toggle from "./Toggle";
import { HiCheck } from "react-icons/hi";

export const SettingsToggle = ({
	saved = false,
	enabled,
	onToggle,
	disabled = false,
	helper,
	label,
	description,
}: {
	label: string;
	description?: string;
	saved?: boolean;
	enabled: boolean;
	onToggle: () => void;
	disabled?: boolean;
	helper?: React.ReactNode;
}) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-x-2">
					<label
						className={`text-sm md:text-base font-semibold ${
							!disabled ? "text-slate-900" : "text-slate-400"
						}`}
					>
						{label}
					</label>
					{saved && (
						<div className="text-sm text-teal-600 flex items-center font-semibold ml-2">
							<>Changes saved</>
							<HiCheck className="w-5 h-5" />
						</div>
					)}
				</div>
				<p
					className={`text-sm md:text-base ${
						!disabled ? "text-slate-600" : "text-slate-400"
					}`}
				>
					{description}
				</p>
				{helper && <div className="mt-1">{helper}</div>}
			</div>
			<div className="px-4">
				<Toggle enabled={enabled} disabled={disabled} onToggle={onToggle} />
			</div>
		</div>
	);
};
