import RadioButton, { RadioButtonProps } from "./RadioButton";

export interface RadioButtonGroupProps {
	radioButtons: Pick<RadioButtonProps, "id" | "text">[];
	state: number;
	setState: (state: number | null) => void;
}
function RadioButtonGroup({
	radioButtons,
	state,
	setState,
}: RadioButtonGroupProps) {
	return (
		<div className="flex flex-col space-y-2 mb-5">
			{radioButtons.map(({ id, text }, i) => {
				return (
					<RadioButton
						id={id}
						text={text}
						selected={state === id}
						onSelect={setState}
						key={i}
					/>
				);
			})}
		</div>
	);
}

export default RadioButtonGroup;
