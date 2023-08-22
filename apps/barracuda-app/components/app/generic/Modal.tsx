import React, { Fragment, MutableRefObject, ReactNode } from "react";
import { HiX } from "react-icons/hi";
import { Card, TCardBackground } from "./Card";
import IconButton from "./IconButton";
import { Dialog, Transition } from "@headlessui/react";

export interface ModalProps {
	isOpen: boolean;
	onDismiss: () => void;
	children: ReactNode;
	customCard?: boolean;
	showCloseButton?: boolean;
	className?: string;
	width?: string;
	height?: string;
	containerClassName?: string;
	background?: TCardBackground;
	heightAuto?: boolean;
	centerVertically?: boolean;
	disableAutofocus?: boolean;
	isChild?: boolean;
	padding?: string;
	initialFocus?: MutableRefObject<HTMLElement | null>;
}
export const Modal = ({
	isOpen,
	onDismiss,
	className,
	containerClassName,
	customCard = false,
	showCloseButton = true,
	children,
	width,
	height,
	background = "bg-white",
	heightAuto = true,
	centerVertically = true,
	disableAutofocus = false,
	isChild = false,
	initialFocus,
	padding,
	...props
}: ModalProps) => {
	const getSize = () => {
		return `${height !== "" ? height : "h-max max-h-full"} ${
			width !== "" ? width : "max-w-3xl w-full"
		} mx-auto`;
	};
	const getVerticalAlignment = () => {
		switch (centerVertically) {
			case true:
				return `flex flex-col justify-center items-center overflow-y-auto min-h-full `;
			case false:
			default:
				return ``;
		}
	};

	const getPadding = () => {
		return padding !== undefined ? padding : "p-2 sm:p-4 lg:p-8";
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				onClose={onDismiss}
				as="div"
				className="relative z-150"
				initialFocus={initialFocus}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-150"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-slate-900/20" />
				</Transition.Child>

				<div
					className={`fixed inset-0 ${getVerticalAlignment()} ${getPadding()} ${containerClassName}`}
				>
					<Transition.Child
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="opacity-0 translate-y-2"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-75"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-2"
					>
						<Dialog.Panel className={`relative ${getSize()}`} {...props}>
							{showCloseButton && (
								<IconButton
									icon={<HiX className="w-5 h-5 " />}
									size="small"
									className="absolute top-2 right-2"
									onClick={onDismiss}
									tabIndex={-1}
								/>
							)}

							{customCard ? (
								children
							) : (
								<Card
									className={`py-12 px-8 md:py-16 md:px-10 flex flex-col overflow-auto ${getSize()}`}
									background={background}
								>
									{children}
								</Card>
							)}
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};
