import { ReactNode } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export interface RadioButtonProps {
	id: number;
	text: ReactNode;
	selected?: boolean;
	className?: string;
	onSelect: (id: number) => void;
}
function RadioButton({
	id,
	selected = false,
	text,
	onSelect,
	className,
}: RadioButtonProps) {
	const s = selected
		? "text-slate-900 border-cuda-500 border-2"
		: "text-slate-600 border-slate-300 border";

	return (
		<div
			className="relative cursor-pointer"
			onClick={() => {
				onSelect(id);
			}}
		>
			<div
				className={`px-6 py-4 rounded-lg hover:border-cuda-500 bg-slate-100  ${s} ${className}`}
			>
				{text}
			</div>
			{selected && (
				<IoCheckmarkCircleSharp className="absolute bg-slate-50 rounded-full -top-2 -right-2 w-6 h-6 text-cuda-500" />
			)}
		</div>
	);
}

export default RadioButton;
