export interface TextAreaProps {
	style?: "default" | "minimal";
	id: string;
	numRows?: number;
	resizeable?: boolean;
	labelSize?: string;
	placeholder?: string;
	defaultValue?: string;
	description?: string;
	placeholderClassName?: string;
	className?: string;
	label?: string;
	value: string;
	onChange?: (e: any) => void;
	textSize?: "xs" | "small" | "default" | "large";
	autoFocus?: boolean;
}

function TextArea({
	id,
	numRows = 4,
	resizeable = false,
	placeholder = "",
	description,
	value,
	label,
	labelSize = "small",
	placeholderClassName = "",
	className,
	onChange,
	style = "default",
	textSize = "default",
	autoFocus = false,
}: TextAreaProps) {
	const rs = resizeable ? "resize-none" : "";

	const getTextSize = () => {
		switch (textSize) {
			case "xs":
				return "text-xs";
			case "small":
				return "text-sm";
			case "large":
				return "text-lg";
			case "default":
				return "text-base";
		}
	};

	const getStyle = () => {
		switch (style) {
			case "minimal":
				return "bg-transparent border-0 focus:ring-0 focus-within:ring-0 p-0";
			case "default":
			default:
				return `p-3 shadow-sm border placeholder-slate-400 placeholder:font-normal focus:ring-cuda-500 focus:border-cuda-500 focus:bg-white focus-within:shadow-lg focus-within:shadow-cuda-500/20 text-sm sm:text-base border-slate-300 text-slate-600 bg-slate-100 rounded-lg  `;
		}
	};

	return (
		<div className={`${className}`}>
			{label && (
				<div className="flex justify-between mb-2">
					<label
						htmlFor={label}
						className={`${
							labelSize === "large"
								? "text-base text-slate-900"
								: "text-sm text-slate-600"
						} block font-semibold `}
					>
						{label}
					</label>
					{/* <span className="text-sm text-slate-400">{cornerInfo}</span> */}
				</div>
			)}
			{description && description.length > 0 && (
				<p className=" mb-4 text-slate-500 text-sm">{description}</p>
			)}
			<textarea
				autoFocus={autoFocus}
				rows={numRows}
				name={id}
				id={id}
				value={value}
				placeholder={placeholder}
				className={`${getStyle()} ${
					placeholderClassName !== ""
						? placeholderClassName
						: "placeholder-slate-400 placeholder:font-normal"
				}  block w-full ${getTextSize()} ${rs}`}
				onChange={onChange}
			/>
		</div>
	);
}

export default TextArea;
