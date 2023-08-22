import { CgChevronRight } from "react-icons/cg";
import Breadcrumb, { BreadcrumbProps } from "./Breadcrumb";

interface BreadcrumbsProps {
	breadcrumbs?: Exclude<BreadcrumbProps, "highlighted">[];
	className?: string;
}
const Breadcrumbs = ({ breadcrumbs, className }: BreadcrumbsProps) => {
	return (
		<div
			className={`font-semibold text-slate-400 text-xs tracking-wide flex flex-wrap gap-1 md:gap-2 gap items-center ${className}`}
		>
			{breadcrumbs &&
				breadcrumbs.length > 0 &&
				breadcrumbs.map((crumb, i) => {
					return (
						<div key={i} className="md:gap-2 items-center flex">
							<Breadcrumb
								name={crumb.name}
								href={crumb.href}
								disabled={crumb.disabled}
								highlighted={i === breadcrumbs.length - 1}
							/>
							{i !== breadcrumbs.length - 1 && (
								<CgChevronRight className="text-slate-300" />
							)}
						</div>
					);
				})}
		</div>
	);
};

export default Breadcrumbs;
