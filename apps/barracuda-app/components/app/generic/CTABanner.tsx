import { Link } from "./Link";
import { HiArrowSmRight } from "react-icons/hi";
import { ReactNode } from "react";

export const CTABanner = ({
	newTab,
	contents,
	href,
	logText,
	className,
	align = "center",
	style = "primary",
}: {
	newTab: boolean;
	contents: string | ReactNode;
	logText?: string;
	href: string;
	className?: string;
	align?: "center" | "left";
	style?: "primary" | "secondary";
}) => {
	let logClickText;
	if (logText) {
		logClickText = logText;
	} else {
		if (typeof contents === "string") {
			logClickText = contents;
		} else {
			logClickText = "not set";
		}
	}
	return (
		<Link
			href={href}
			newTab={newTab}
			onClick={() => {}}
			className={`${
				align === "center" ? "mx-auto" : ""
			} max-w-max font-semibold justify-center flex text-center items-center hover:shadow-lg hover:shadow-cuda-500/30 bg-cuda-500 hover:bg-cuda-600 rounded-2xl group py-2 px-6 text-white leading-tight tracking-wide text-xs sm:text-sm transition-all ease-out duration-200 ${className}`}
		>
			<span>
				{contents}
				<HiArrowSmRight className="inline-flex ml-1.5 -mr-1 w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-all ease-out duration-200" />
			</span>
		</Link>
	);
};

export default CTABanner;
