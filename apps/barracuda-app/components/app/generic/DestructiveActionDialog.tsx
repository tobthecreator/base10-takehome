import Button from "./Button";
import { Modal } from "./Modal";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

export const DestructiveActionDialog = ({
	isOpen,
	onDismiss,
	confirmAction,
	backButtonText,
	confirmButtonText,
	titleText,
	message,
	customContents = false,
	children,
}: {
	isOpen: boolean;
	onDismiss: () => void;
	confirmAction: () => void;
	backButtonText?: string;
	confirmButtonText?: string;
	titleText?: string;
	message?: string | React.ReactNode;
	customContents?: boolean;
	children?: React.ReactNode;
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<Modal
			isOpen={isOpen}
			onDismiss={onDismiss}
			customCard
			showCloseButton={false}
		>
			<div className="max-w-2xl flex flex-col bg-white rounded-lg overflow-auto">
				<div className="flex justify-between items-center px-4 py-3 border-b-2 border-slate-100">
					<p className="font-semibold text-slate-400 text-sm sm:text-base">
						{titleText ? titleText : "Please confirm"}
					</p>
					<button className="rotate-45 cursor-pointer" onClick={onDismiss}>
						<HiPlus className="w-6 h-6 text-slate-400 hover:text-slate-900" />
					</button>
				</div>
				{customContents ? (
					children
				) : (
					<div className="rounded-lg bg-rose-50 p-8 mx-4 mt-4 mb-1">
						<img
							src="/images/illus/danger.png"
							alt="Danger danger danger (barry at a desk)"
							className="max-w-[200px] mx-auto mb-4"
						/>
						<div className="font-semibold text-slate-900">
							{message ? (
								message
							) : (
								<p className="font-normal text-slate-900 text-center text-sm sm:text-base">
									This is a{" "}
									<span className="font-semibold">dangerous action.</span> Are
									you sure you want to proceed?
								</p>
							)}
						</div>
					</div>
				)}

				<div className="flex flex-col-reverse gap-2 items-stretch sm:flex-row justify-between px-4 pt-3 pb-6 sm:pb-4">
					<Button color="outline" size="small" onClick={onDismiss}>
						{backButtonText ? backButtonText : "Back"}
					</Button>

					<Button
						color="danger"
						onClick={() => {
							setLoading(true);
							confirmAction();
							// alert("AHOY MATEY");
							onDismiss();
							setLoading(false);
						}}
						size="small"
						disabled={loading}
					>
						{confirmButtonText ? confirmButtonText : "Confirm"}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default DestructiveActionDialog;
