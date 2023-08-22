interface DividerProps {
	size?: "small" | "large" | "full" | "auto";
	className?: string;
	borderColor?: string;
	style?: React.CSSProperties;
	text?: string;
}
const Divider = ({
	size = "auto",
	borderColor = "border-slate-100",
	className,
	style,
	text,
}: DividerProps) => {
	const getWidth = () => {
		switch (size) {
			case "small":
				return "w-14";
			case "large":
				return "w-28";
			case "full":
				return "w-full";
			case "auto":
			default:
				return "w-auto";
		}
	};

	const width = getWidth();
	return (
		<>
			{text ? (
				<div className={`flex ${className}`}>
					<div
						style={style}
						className={`border-t self-center ${borderColor} ${width}`}
					/>
					<div className="mx-3 text-slate-400 font-semibold">{text}</div>
					<div
						style={style}
						className={`border-t self-center ${borderColor} ${width}`}
					/>
				</div>
			) : (
				<div
					style={style}
					className={`border-t ${borderColor} ${width} ${className}`}
				/>
			)}
		</>
	);
};

export default Divider;
