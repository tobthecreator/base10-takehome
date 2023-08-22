import { Combobox, Listbox, Transition } from "@headlessui/react";
import Button from "./Button";
import Divider from "./Divider";
import { TAlignOptions } from "libs/shared/interfaces";
import { Fragment, ReactNode, useRef, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { usePopper } from "react-popper";

export type TSelectChoice = {
	label: string;
	[key: string]: any;
};

export const Select = ({
	choices,

	selectedChoice,
	onChange,
	by,
	placeholder = "Select",
	children,
	showSearch = true,
	align = "bottom-left",
}: {
	choices: TSelectChoice[];
	selectedChoice: TSelectChoice | null;
	onChange: (value) => void;
	by?: string;
	placeholder?: string;
	children?: ReactNode;
	showSearch?: boolean;
	align?: TAlignOptions;
}) => {
	// Popper for positioning the dropdown
	const popperElRef = useRef(null);
	const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(
		null
	);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
		null
	);
	const { styles, attributes } = usePopper(targetElement, popperElement, {
		placement: "bottom-start",
		modifiers: [
			{
				name: "offset",
				options: {
					offset: [0, 4],
				},
			},
		],
	});

	// for searching the choices
	const [query, setQuery] = useState("");
	const filteredChoices =
		query === ""
			? choices
			: choices.filter((choice) => {
					return choice.label.toLowerCase().includes(query.toLowerCase());
			  });

	const getAlignment = () => {
		switch (align) {
			case "bottom-left":
				return "left-0";
			default:
			case "bottom-right":
				return "right-0";
		}
	};

	const Wrapper = showSearch ? Combobox : (Listbox as React.ElementType);
	const WrapperButton = showSearch
		? Combobox.Button
		: (Listbox.Button as React.ElementType);

	return (
		<Wrapper value={selectedChoice} onChange={onChange} by={by}>
			<div className="relative">
				<WrapperButton
					as={"div"}
					className={`flex items-center `}
					ref={setTargetElement}
				>
					{children ? (
						children
					) : (
						<Button color="minimal" size="xs" className="font-normal">
							{selectedChoice?.label ?? placeholder}
						</Button>
					)}
				</WrapperButton>

				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					afterLeave={() => {
						setQuery("");
					}}
				>
					<div
						className={`${getAlignment()} py-1 w-auto max-w-xs absolute z-150 rounded-lg shadow-xl bg-white border-slate-200 border focus-visible:outline-none px-1`}
					>
						{
							<SelectInner
								showSearch={showSearch}
								setQuery={setQuery}
								filteredChoices={filteredChoices}
							/>
						}
					</div>
				</Transition>
			</div>
		</Wrapper>
	);
};

export default Select;

export const SelectInner = ({
	showSearch,
	setQuery,
	filteredChoices,
}: {
	showSearch: boolean;
	setQuery;
	filteredChoices: TSelectChoice[];
}) => {
	const WrapperOptions = showSearch
		? Combobox.Options
		: (Listbox.Options as React.ElementType);
	const WrapperOption = showSearch
		? Combobox.Option
		: (Listbox.Option as React.ElementType);

	return (
		<>
			{showSearch && (
				<>
					<Combobox.Input
						onChange={(event) => setQuery(event.target.value)}
						className={`w-full border-0 py-2 pl-2 pr-10 text-sm leading-5 placeholder:text-slate-400 text-slate-600 focus:ring-0`}
						placeholder="Filter by..."
					/>
					<div className="pb-1">
						<Divider />
					</div>
				</>
			)}
			<WrapperOptions className="focus-visible:outline-none">
				{filteredChoices.map((choice, index) => (
					<WrapperOption
						key={index}
						className={({ active, selected }) => `${
							active ? "text-slate-600 bg-slate-100" : "text-slate-600"
						} ${selected ? "text-slate-600 bg-slate-150" : "text-slate-600"}
														relative cursor-default list-none select-none py-1 pl-3 pr-9 text-sm rounded-md `}
						value={choice}
					>
						{({ selected, active }) => (
							<div className="flex items-center justify-between gap-1">
								<div className={`gap-2 flex items-center`}>
									<span
										className={`${selected ? "font-semibold" : "font-normal"}
																	"ml-2 block truncate`}
									>
										{choice.label}
									</span>
								</div>

								{selected ? (
									<span
										className={
											"text-cuda-500 absolute inset-y-0 right-0 flex items-center pr-4"
										}
									>
										<HiCheck className="h-5 w-5" aria-hidden="true" />
									</span>
								) : null}
							</div>
						)}
					</WrapperOption>
				))}
			</WrapperOptions>
		</>
	);
};
