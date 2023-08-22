import { ReactNode, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDebounce } from "usehooks-ts";

export type InputState = "success" | "error" | "none" | "readonly";
type InputType = "text" | "password" | "email";

/**
 * TODO-AK - This is a copy of the Input component, but with a few changes to make it work with pre-filled add-on text and autocorrection with the "customParser"
 * This component could use some cleanup since it's a clone of the input, but we may want to extend this for other uses soon, so I'd rather not pull it apart
 * when we don't know how we'll use it moving forward
 * **/
interface InputProps {
	label?: string;
	labelInset?: boolean;
	labelSize?: string;
	description?: string;
	value: string;
	cornerInfo?: ReactNode;
	helperText?: ReactNode;
	helperTextState?: InputState;
	placeholder?: string;
	readOnly?: boolean;
	state?: InputState;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	type?: InputType;
	required?: boolean;
	className?: ReactNode;
	pattern?: string;
	minLength?: number;
	maxLength?: number;
	onChange?: (e: any) => void;
	addOnText?: string;
	customParser?: (value: string) => string;
}
export function UrlInput({
	label,
	labelInset = false,
	labelSize = "small",
	description,
	value,
	cornerInfo,
	helperText,
	helperTextState,
	placeholder,
	state = "none",
	iconLeft,
	iconRight,
	type = "text",
	required = false,
	className,
	readOnly = false,
	minLength,
	maxLength,
	pattern,
	onChange,
	addOnText,
	customParser,
}: InputProps) {
	const getStateClasses = (state): string => {
		switch (state) {
			case "error":
				return `bg-rose-50 border-slate-200 text-rose-600 focus-within:bg-rose-50 ring-1 ring-rose-600 hover:text-rose-600 border-rose-600`;
			case "readonly":
				return `bg-slate-100 border-slate-300 text-slate-400`;

			case "success":
			case "none":
			default:
				return `bg-slate-50 border-slate-300 text-slate-600 focus-within:bg-white focus-within:ring-1 focus-within:ring-cuda-500 focus-within:border-cuda-500 focus-within:shadow-lg focus-within:shadow-cuda-500/20`;
		}
	};

	const getIconRight = (state, icon): ReactNode => {
		switch (state) {
			case "success":
				return <FaCheck className="text-cuda-500" size={16} />;
			case "error":
				return <FaTimes size={16} />;
			case "none":
			default:
				if (icon) return icon;
				return <></>;
		}
	};

	const debouncedValue = useDebounce(value, 750);

	useEffect(() => {
		if (
			debouncedValue &&
			debouncedValue.length > 0 &&
			customParser &&
			onChange
		) {
			onChange(customParser(debouncedValue));
		}
	}, [debouncedValue]);

	const getHelperTextState = (state, helperTextState): string => {
		// Input state always supercedes helper text state
		if (state === "error") {
			return "text-rose-600";
		}

		switch (helperTextState) {
			case "success":
				return "text-cuda-500";
			case "error":
				return "text-rose-600";
			case "none":
			default:
				return "";
		}
	};

	const s = getStateClasses(state);
	const ir = getIconRight(state, iconRight);
	const ht = getHelperTextState(state, helperTextState);
	return (
		<div className={`${className}`}>
			{!labelInset && (
				<div className="flex justify-between mb-2 items-end">
					<div className="flex items-center">
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
					</div>

					<span className="text-sm text-slate-400">{cornerInfo}</span>
				</div>
			)}
			{description && description.length > 0 && (
				<p className=" mb-4 text-slate-500 text-sm">{description}</p>
			)}

			<div className={`inline-flex border rounded-md w-full ${s}`}>
				{addOnText && (
					<span className="relative px-3 py-2 border-r-2 rounded-l-md bg-slate-100 border-slate-300 whitespace-nowrap">
						{addOnText}
					</span>
				)}
				<div className="relative px-3 py-2 w-full">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						{iconLeft}
					</div>
					<input
						required={required}
						type={type}
						name={label}
						id={label}
						value={value}
						pattern={pattern ? pattern.split("/").join("") : pattern}
						minLength={minLength}
						maxLength={maxLength}
						readOnly={readOnly}
						className={`bg-inherit block w-full placeholder-slate-400 placeholder:font-normal placeholder:text-sm focus:ring-0 outline-none border-0 ${
							iconLeft ? "pl-10" : "p-0"
						}`}
						placeholder={placeholder}
						onChange={(e) => onChange && onChange(e.target.value)}
						spellCheck="false"
					/>
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
						{ir}
					</div>
				</div>
			</div>

			<p className={`mt-2 mb-2`}>
				<small className={`${ht}`}>{helperText}</small>
			</p>
		</div>
	);
}

export default UrlInput;
