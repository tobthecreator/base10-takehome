export interface RadioProps {
	display: string;
	id: string;
	description?: string;
	onToggle: (id: string) => void;
	checked?: boolean;
}
export function Radio({
	display,
	id,
	description,
	onToggle,
	checked,
}: RadioProps) {
	return (
		<div className="inline-flex grow-0 items-start hover:bg-slate-100 px-4 py-2 rounded-full">
			<div className="flex items-center h-5">
				<input
					id={id}
					aria-describedby={`${id}-toggle`}
					name={id}
					type="radio"
					className="h-6 w-6 text-cuda-500 border-gray-300 rounded-full ring-transparent"
					checked={checked}
					onChange={() => onToggle(id)}
				/>
			</div>
			<div className="ml-4 text-sm">
				<label htmlFor={id} className="font-semibold text-slate-900">
					{display}
				</label>
				<p id={`${id}-description`} className="text-gray-500">
					{description}
				</p>
			</div>
		</div>
	);
}

export default Radio;
