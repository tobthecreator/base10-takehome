import { ReactNode } from "react";
import Divider from "./Divider";

interface EditContainerProps {
	layoutImage: string;
	title: string;
	index: number;
	editComponent?: ReactNode;
	hasPreview?: boolean;
	previewComponent?: ReactNode;
	numChanges?: number;
	description?: ReactNode;
}

export const EditContainer = ({
	layoutImage,
	title,
	index,
	editComponent,
	hasPreview = true,
	previewComponent,
	numChanges,
	description,
}: EditContainerProps) => {
	return (
		<>
			<div className="grid grid-rows-1">
				<div className="grid grid-cols-1">
					<img
						src={`/images/layouts/${layoutImage}.svg`}
						alt={`Edit the ${title} section`}
						className="h-auto w-24"
					/>
				</div>
			</div>
			<div className="flex justify-between items-end mt-4">
				<h3 id={`edit-${index}`}>{title}</h3>
				{numChanges && numChanges > 0 ? (
					<p className="text-cuda-500 text-semibold text-sm">
						<i>Unpublished Changes</i>
					</p>
				) : (
					<></>
				)}
			</div>

			<div className="text-slate-500 pt-4 pb-4 max-w-2xl">{description}</div>

			<Divider size="full" className="mt-2 mb-4" />

			<div className="grid grid-rows-1 w-full mt-7 pb-32">
				<div
					className={`grid grid-cols-1 relative ${
						hasPreview && "md:grid-cols-2"
					} gap-x-4`}
				>
					<div className={`grid auto-rows-auto `}>
						<div>{editComponent}</div>
					</div>
					{hasPreview && (
						<div className="hidden md:flex md:flex-col items-end justify-start pointer-events-none ">
							<div className="flex-col w-full max-w-sm items-center sticky top-20">
								<p className="text-sm text-slate-400 font-semibold text-center mb-2">
									Preview Changes
								</p>
								{previewComponent}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
