import Checkbox, { CheckboxProps, CheckboxButton } from "./Checkbox";

interface CheckboxGroupProps {
	checkboxes: Pick<CheckboxProps, "id" | "description" | "display">[];
	state: string[];
	setState: (state: string[]) => void;
	showClearButton?: boolean;
	checkboxStyle?: "default" | "button";
}
export function CheckboxGroup({
	checkboxes,
	state,
	setState,
	showClearButton = true,
	checkboxStyle = "default",
}: CheckboxGroupProps) {
	const updateState = (id: string) => {
		if (state.includes(id)) {
			setState([...state].filter((s) => s !== id));
			return;
		}

		setState([...state, id]);
	};

	const clearState = () => {
		setState([]);
	};

	return (
		<div
			className={`${
				checkboxStyle === "button" ? "gap-2" : "gap-0"
			} flex flex-col`}
		>
			{showClearButton && (
				<div
					className="text-cuda-500 text-sm hover:underline cursor-pointer pb-4 pt-2"
					onClick={clearState}
				>
					<i>Clear selection</i>
				</div>
			)}

			{checkboxes.map(({ display, id, description }, i) => {
				return checkboxStyle === "button" ? (
					<CheckboxButton
						display={display}
						key={i}
						id={id}
						description={description}
						checked={state.includes(id)}
						onToggle={updateState}
					/>
				) : (
					<Checkbox
						display={display}
						key={i}
						id={id}
						description={description}
						checked={state.includes(id)}
						onToggle={updateState}
					/>
				);
			})}
		</div>
	);
}

export default CheckboxGroup;
