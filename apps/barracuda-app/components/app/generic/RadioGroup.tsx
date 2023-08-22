import Radio, { RadioProps } from "./Radio";

interface RadioGroupProps {
	radios: Pick<RadioProps, "display" | "id" | "description">[];
	state: string;
	setState: (state: string | null) => void;
}
export function RadioGroup({ radios, state, setState }: RadioGroupProps) {
	const updateState = (id: string) => {
		setState(id);
	};

	const clearState = () => {
		setState(null);
	};

	return (
		<div className="space-y-0 flex flex-col">
			<div
				className="text-cuda-500 text-sm hover:underline cursor-pointer"
				onClick={clearState}
			>
				<i>Clear selection</i>
			</div>

			{radios.map(({ display, id, description }, i) => {
				return (
					<Radio
						display={display}
						key={i}
						id={id}
						description={description}
						checked={state === id}
						onToggle={updateState}
					/>
				);
			})}
		</div>
	);
}

export default RadioGroup;
