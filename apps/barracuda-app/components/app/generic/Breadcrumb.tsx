import { CapitalizeFirstLetters } from "libs/shared/helpers";
import { Link } from "./Link";

export interface BreadcrumbProps {
	name: string;
	disabled: boolean;
	highlighted?: boolean;
	href?: string;
}
const Breadcrumb = ({
	name,
	disabled = false,
	highlighted = false,
	href,
}: BreadcrumbProps) => {
	const color = highlighted ? "text-cuda-500" : "text-slate-400";
	return (
		<>
			{!disabled && href ? (
				<Link
					href={href}
					className={`${color} cursor-pointer hover:text-cuda-500`}
				>
					{CapitalizeFirstLetters(name)}
				</Link>
			) : (
				<div className={`${color} cursor-default`}>
					{CapitalizeFirstLetters(name)}
				</div>
			)}
		</>
	);
};

export default Breadcrumb;
