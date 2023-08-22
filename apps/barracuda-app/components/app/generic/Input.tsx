import { TSizeOptions } from "libs/shared/interfaces";
import { ReactNode } from "react";
import { HiCheck } from "react-icons/hi";
import { IoCheckmark } from "react-icons/io5";

export type InputState = "success" | "error" | "none" | "readonly";
type InputType = "text" | "password" | "email" | "number" | "date";
export interface InputProps {
	style?: "default" | "minimal";
	textSize?: TSizeOptions;
	size?: TSizeOptions | string;
	label?: string;
	labelInset?: boolean;
	labelSize?: string;
	description?: string;
	value: string;
	cornerInfo?: ReactNode;
	helperText?: ReactNode;
	helperTextState?: InputState;
	placeholder?: string;
	placeholderClassName?: string;
	focusClassName?: string;
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
	onClick?: (e: any) => void;
	onBlur?: (e: any) => void;
	onFocus?: (e: any) => void;
	onKeyDown?: (e: any) => void;
	onKeyUp?: (e: any) => void;
	showSaveNotification?: boolean;
	padding?: string;
	background?: string;
	autoFocus?: boolean;
	title?: string;
	id?: string;
}
export function Input({
	textSize = "default",
	size = "default",
	style = "default",
	label,
	labelInset = false,
	labelSize = "small",
	description,
	value,
	cornerInfo,
	helperText,
	helperTextState,
	placeholder,
	placeholderClassName = "",
	focusClassName,
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
	onClick,
	onBlur,
	onFocus,
	onKeyDown,
	onKeyUp,
	showSaveNotification,
	padding,
	background,
	autoFocus = false,
	title,
	id,
}: InputProps) {
	const getStyle = () => {
		switch (style) {
			case "minimal":
				return "bg-transparent";
			case "default":
			default:
				return `border rounded-md `;
		}
	};

	const getTextSize = () => {
		switch (textSize) {
			case "xs":
				return "text-xs";
			case "small":
				return "text-sm";
			case "large":
				return "text-lg py-0.5 px-2 sm:py-1";
			case "xl":
				return "text-xl md:text-2xl font-display tracking-tight py-0.5 px-2";
			case "default":
			default:
				return "text-base";
		}
	};

	const getSize = () => {
		switch (size) {
			case "xs":
				return "py-px px-1.5";
			case "small":
				return "py-1 px-2";
			case "large":
				return "py-4 px-6";
			case "default":
				return "py-2 px-3";
			default:
				return size;
		}
	};

	const getStateClasses = (state): string => {
		if (style === "minimal") {
			switch (state) {
				case "error":
					return `bg-rose-50 border-slate-200 text-rose-600 focus-within:bg-rose-50 ring-1 ring-rose-600 hover:text-rose-600 border-rose-600`;
				case "readonly":
					return `${background ? background : "bg-slate-100"} text-slate-400`;

				case "success":
				case "none":
				default:
					return `${
						focusClassName
							? focusClassName
							: "focus-within:ring-1 focus-within:ring-cuda-500 focus-within:shadow-md"
					} rounded-md`;
			}
		} else {
			switch (state) {
				case "error":
					return `bg-slate-50  border-slate-200 text-rose-600 ring-1 ring-rose-500`;
				case "readonly":
					return `${
						background ? background : "bg-slate-100"
					} border-slate-300 text-slate-400`;

				case "success":
				case "none":
				default:
					return `${
						background ? background : "bg-slate-100"
					} border-slate-300 text-slate-600 ${
						focusClassName
							? focusClassName
							: "focus-within:bg-white focus-within:ring-1 focus-within:ring-cuda-500 focus-within:border-transparent"
					}`;
			}
		}
	};

	const getIconRight = (state, icon): ReactNode => {
		switch (state) {
			case "success":
				return <HiCheck className="text-cuda-500" size={16} />;
			case "error":
				return null;
			case "none":
			default:
				if (icon) return icon;
				return null;
		}
	};

	const getHelperTextState = (state, helperTextState): string => {
		// Input state always supercedes helper text state
		if (state === "error") {
			return "text-rose-600";
		}

		switch (helperTextState) {
			case "success":
				return "text-teal-600";
			case "error":
				return "text-rose-600";
			case "readonly":
				return "text-slate-400";
			case "none":
			default:
				return "";
		}
	};

	const s = getStateClasses(state);
	const ir = getIconRight(state, iconRight);
	const ht = getHelperTextState(state, helperTextState);
	return (
		<div className={`${className}`} onClick={onClick}>
			{!labelInset && label && label !== "" && (
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
						{showSaveNotification && (
							<div className="text-sm text-teal-600 flex items-center space-x-2 font-semibold ml-4">
								<>Changes saved</>
								<IoCheckmark className="w-5 h-5" />
							</div>
						)}
					</div>

					<span className="text-sm text-slate-400">{cornerInfo}</span>
				</div>
			)}
			{description && description.length > 0 && (
				<p className=" mb-4 text-slate-600 text-sm">{description}</p>
			)}
			<div className={`${getStyle()} ${s}`}>
				{labelInset && (
					<label htmlFor={label} className="block text-xs">
						{label}
					</label>
				)}
				<div className="relative">
					{iconLeft && (
						<div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
							{iconLeft}
						</div>
					)}
					<input
						title={title}
						autoFocus={autoFocus}
						required={required}
						type={type}
						name={label}
						id={id ?? label}
						value={value}
						pattern={pattern ? pattern.split("/").join("") : pattern}
						minLength={minLength}
						maxLength={maxLength}
						readOnly={readOnly}
						className={`bg-inherit block w-full  ${
							placeholderClassName !== ""
								? placeholderClassName
								: "placeholder-slate-400 placeholder:font-normal"
						} ring-0 outline-none border-0  ${getSize()} ${getTextSize()} ${
							iconLeft ? "pl-8" : "p-0"
						}`}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
						onFocus={onFocus}
						onKeyDown={onKeyDown}
						onKeyUp={onKeyUp}
					/>
					{ir && (
						<div className="absolute inset-y-0 right-2  flex items-center">
							{ir}
						</div>
					)}
				</div>
			</div>

			{helperText && helperText !== "" && (
				<p className={`mt-2 mb-2`}>
					<small className={`${ht}`}>{helperText}</small>
				</p>
			)}
		</div>
	);
}

export default Input;
