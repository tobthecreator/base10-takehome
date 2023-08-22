import { ReactNode } from "react";

type TagColors = "primary" | "secondary" | "success" | "error";
type TagSizes = "normal" | "small";
interface TagProps {
	color?: TagColors;
	size?: TagSizes;
	children: ReactNode;
	icon?: ReactNode;
}
export function Tag({
	color = "primary",
	size = "normal",
	icon,
	children,
}: TagProps) {
	const getColor = (color: TagColors): string => {
		switch (color) {
			case "primary":
				return "text-cuda-500 bg-orange-50";
			case "secondary":
				return "text-sky-700 bg-sky-100";
			case "success":
				return "text-teal-600 bg-teal-50";
			case "error":
				return "text-pink-600 bg-pink-50";
			default:
				return "";
		}
	};

	const s = size === "normal" ? "px-3 py-2" : "px-2 py-1";
	const fs =
		size === "normal"
			? "font-semibold pre-title"
			: "font-semibold text-xs tracking-wide uppercase";
	const c = getColor(color);

	return (
		<div className={`inline-flex items-center rounded-lg ${s} ${fs} ${c}`}>
			{icon && (
				<div className="-ml-0.5 mr-2" aria-hidden="true">
					{icon}
				</div>
			)}
			{children}
		</div>
	);
}

export default Tag;
