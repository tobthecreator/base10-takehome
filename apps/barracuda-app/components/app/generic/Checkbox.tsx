import { HiCheckCircle } from "react-icons/hi";

export interface CheckboxProps {
	display: string;
	id: string;
	description?: string;
	onToggle: (id: string) => void;
	checked?: boolean;
	className?: string;
}
export function Checkbox({
	display,
	id,
	description,
	onToggle,
	checked,
	className,
}: CheckboxProps) {
	return (
		<div
			className={`inline-flex grow-0 items-start hover:bg-slate-100 px-2 py-2 rounded-lg ${className}`}
		>
			<div className="flex items-center h-5">
				<input
					id={id}
					aria-describedby={`${id}-toggle`}
					name={id}
					type="checkbox"
					className={`h-5 w-5 text-cuda-500 ${
						checked ? "border-cuda-500" : "border-slate-300"
					} rounded-md ring-transparent cursor-pointer`}
					checked={checked}
					onChange={() => onToggle(id)}
				/>
			</div>
			<div className="ml-2 text-sm">
				<label
					htmlFor={id}
					className={`${
						checked ? "text-slate-900" : "text-slate-600"
					} cursor-pointer`}
				>
					{display}
				</label>
				<p id={`${id}-description`} className="text-slate-500">
					{description}
				</p>
			</div>
		</div>
	);
}

export const CheckboxButton = ({
	display,
	id,
	description,
	onToggle,
	checked,
	className,
}: CheckboxProps) => {
	const s = checked
		? "text-slate-900 border-cuda-500 border border-2"
		: "text-slate-600 border-slate-300 border";
	return (
		<div
			className={`flex relative cursor-pointer hover:bg-slate-100 rounded-lg ${className}`}
		>
			<label
				htmlFor={id}
				className={`${
					checked ? "" : ""
				} px-6 py-4 rounded-lg hover:border-cuda-500 bg-slate-100 w-full text-slate-900 cursor-pointer ${s}`}
			>
				<input
					id={id}
					aria-describedby={`${id}-toggle`}
					name={id}
					type="checkbox"
					className="hidden text-cuda-500 border-gray-300 rounded-lg ring-transparent cursor-pointer"
					checked={checked}
					onChange={() => onToggle(id)}
				/>
				{display}
			</label>
			<p id={`${id}-description`} className="text-gray-500">
				{description}
			</p>
			{checked && (
				<HiCheckCircle className="absolute bg-slate-50 rounded-full -top-2 -right-2 w-6 h-6 text-cuda-500" />
			)}
		</div>
	);
};

export default Checkbox;
