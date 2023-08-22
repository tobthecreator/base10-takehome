import Button, { ButtonProps } from "./Button";
import Input, { InputProps } from "./Input";

const TextInputWithButton = ({
	inputProps,
	buttonProps,
}: {
	inputProps: InputProps;
	buttonProps: ButtonProps;
}) => {
	return (
		<div className="flex flex-row items-center w-full justify-between gap-x-2">
			<Input
				{...inputProps}
				className={`${inputProps.className ?? ""} text-ellipsis grow`}
			/>
			<div className="flex items-end py-2 min-w-fit">
				<Button
					{...buttonProps}
					size="small"
					color="primary"
					className={`${inputProps.className ?? ""} h-[42px] w-full px-8`}
				>
					{buttonProps.children}
				</Button>
			</div>
		</div>
	);
};

export default TextInputWithButton;
