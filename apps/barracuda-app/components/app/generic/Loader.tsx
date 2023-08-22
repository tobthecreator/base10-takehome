import Lottie from "react-lottie-player";
import * as primaryLoader from "../../../lib/animations/loader.json";
import * as lightLoader from "../../../lib/animations/loader_light.json";
import * as mediumLoader from "../../../lib/animations/loader_med.json";

type LoaderSize = "small" | "medium" | "large" | string;
type LoaderColor = "primary" | "light" | "medium";
interface LoaderProps {
	color?: LoaderColor;
	size?: LoaderSize;
	className?: string;
}

function Loader({
	size = "medium",
	color = "primary",
	className,
}: LoaderProps) {
	const getData = (color: LoaderColor): object => {
		switch (color) {
			case "primary":
				return primaryLoader;
			case "light":
				return lightLoader;
			case "medium":
				return mediumLoader;
			default:
				return primaryLoader;
		}
	};
	const getSize = (size: LoaderSize): string => {
		switch (size) {
			case "small":
				return "w-8 h-8";
			case "medium":
				return "w-12 h-12";
			case "large":
				return "w-16 h-16";
			default:
				return size;
		}
	};
	const s = getSize(size);
	return (
		<Lottie
			speed={1.25}
			loop
			animationData={getData(color)}
			play
			className={`${s} ${className}`}
		></Lottie>
	);
}

export default Loader;

export const MiniLoader = ({
	className = "h-5 w-5",
	color = "default",
}: {
	className?: string;
	color?: "default" | string;
}) => {
	return (
		<svg
			className={`${className} animate-spin`}
			width="22"
			height="22"
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23984 15.5233 4.21446 14.0615 3.60896C12.5997 3.00346 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00346 12.5997 3.60896 14.0615C4.21446 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19"
				stroke={color === "default" ? "#F85E3C" : "currentColor"}
				stroke-width="2"
			/>
		</svg>
	);
};
