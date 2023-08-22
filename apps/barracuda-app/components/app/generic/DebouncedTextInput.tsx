import { forwardRef, useEffect, useState } from "react";

// generic debounced text input
const DebouncedInput = forwardRef(
	(
		{
			value: initialValue,
			onChange,
			debounce = 100,
			...props
		}: {
			value: string | number;
			onChange: (value: string | number) => void;
			debounce?: number;
		} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
		ref
	) => {
		const [value, setValue] = useState(initialValue);

		useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);

		useEffect(() => {
			const timeout = setTimeout(() => {
				onChange(value);
			}, debounce);

			return () => clearTimeout(timeout);
		}, [value]);

		return (
			<input
				{...props}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				ref={ref as React.Ref<HTMLInputElement>}
			/>
		);
	}
);

export default DebouncedInput;
