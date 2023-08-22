import { Combobox, Listbox, Transition } from "@headlessui/react";
import Divider from "./Divider";
import { TAlignOptions } from "libs/shared/interfaces";
import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { usePopper } from "react-popper";
import { useVirtual } from "react-virtual";

export const SelectBox = ({
	options,
	selectedOption,
	onChange,
	placeholder = "Search...",
	children,
	name,
	searchMode,
	customFilterFn,
	displayValue,
	by,
	showImage,
	align = "bottom-left",
	onCreateNew,
	allowCreateNew = false,
	fallBackPrefix,
	setSearchTerm,
	nullable = false,
	className,
}: {
	options: any[];
	selectedOption;
	onChange: (e: any) => void;
	placeholder?: string;
	children: ReactNode;
	name?: string;
	searchMode?: boolean;
	customFilterFn?: (query: string, data: any[]) => any;
	displayValue?: string;
	by?: string;
	showImage?: boolean;
	align?: TAlignOptions;
	allowCreateNew?: boolean;
	onCreateNew?: () => void;
	fallBackPrefix?: ReactNode;
	setSearchTerm?: (query: string) => void;
	nullable?: boolean;
	className?: string;
}) => {
	const [query, setQuery] = useState<string>("");

	const selfManagingSearch = setSearchTerm === undefined;

	let [referenceElement, setReferenceElement] =
		useState<HTMLButtonElement | null>(null);
	let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
	let { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: "bottom-start",
		strategy: "fixed",
	});

	const filteredOptions = selfManagingSearch
		? searchMode
			? customFilterFn
				? customFilterFn(query, options)
				: query === ""
				? options
				: options.filter((option) => {
						const searchItem = displayValue ? option[displayValue] : option;
						return searchItem.toLowerCase().includes(query.toLowerCase());
				  })
			: options
		: [...options];

	fallBackPrefix = fallBackPrefix ? fallBackPrefix : <></>;

	const getAlignment = () => {
		switch (align) {
			case "top-left":
				return "left-0 bottom-full mb-1";
			case "top-right":
				return "right-0 bottom-full mb-1";
			case "bottom-left":
			default:
				return "top-full mt-1";
			case "bottom-right":
				return "top-full right-0 mt-1";
		}
	};

	useEffect(() => {
		if (!setSearchTerm) return;

		setSearchTerm(query);
	}, [query]);

	const containerRef = useRef<HTMLUListElement>(null);
	const rowVirtualizer = useVirtual({
		parentRef: containerRef,
		size: filteredOptions.length,
		overscan: 10,
	});

	const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
	const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
	const paddingBottom =
		virtualRows.length > 0
			? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
			: 0;

	return searchMode ? (
		<Combobox
			value={selectedOption}
			onChange={(e) => {
				if (e !== `create_new_${name}`) {
					onChange(e);
					return;
				}

				if (allowCreateNew && onCreateNew !== undefined) {
					onCreateNew();
					return;
				}
			}}
			name={name || undefined}
			{...{ by: by || undefined }}
			// In defense of my ts-ignore here... this is referred to as Schrodingers Types
			// "Unfortunately, I don't think we can solve this problem in Headless UI right now until TypeScript can handle this case better."
			// https://github.com/tailwindlabs/headlessui/issues/1895#issuecomment-1274765428

			// @ts-ignore
			nullable={nullable}
		>
			<div className={`relative ${className} flex min-w-0`}>
				<Combobox.Button
					as={"div"}
					className={`min-w-0`}
					ref={setReferenceElement}
				>
					{children}
				</Combobox.Button>
				<Transition
					as={Fragment}
					afterLeave={() => {
						if (!selfManagingSearch) {
							setSearchTerm!("");
							return;
						}

						setQuery("");
					}}
				>
					<div
						className={`flex flex-col my-1 z-[150] ${
							allowCreateNew ? "pb-10" : ""
						} max-h-60 w-64 overflow-hidden rounded-md bg-white pt-1 text-sm shadow-lg ring-1 ring-slate-900 ring-opacity-5 focus:outline-none sm:text-sm`}
						ref={setPopperElement}
						style={styles.popper}
						{...attributes.popper}
					>
						<Combobox.Input
							className={`${
								!searchMode && "hidden"
							} w-full border-0 py-2 pl-4 pr-10 text-sm leading-5 placeholder:text-slate-500 text-slate-600 focus:ring-0`}
							onChange={(event) => {
								if (!selfManagingSearch) {
									setSearchTerm!(event.target.value);
									return;
								}

								setQuery(event.target.value);
							}}
							placeholder={placeholder}
							autoFocus={searchMode}
							displayValue={(person) => ""}
						/>

						<Divider />
						<Combobox.Options
							as="div"
							className={"grow overflow-y-auto"}
							ref={containerRef}
						>
							{filteredOptions.length === 0 && query !== "" ? (
								<div className="relative cursor-default select-none py-2 px-4 text-slate-600">
									Nothing found.
								</div>
							) : (
								<>
									{paddingTop > 0 && (
										<div style={{ height: `${paddingTop}px` }} />
									)}
									{virtualRows.map((virtualRow, i) => {
										const option = filteredOptions[virtualRow.index];

										if (!option) return <>Option Loading...</>;

										const currentlySelected =
											option._id &&
											selectedOption?._id &&
											option._id === selectedOption._id;

										return (
											<Combobox.Option
												key={option._id}
												as={Fragment}
												value={option}
											>
												{({ active, selected }) => (
													<li
														className={`relative flex items-center gap-2 cursor-default select-none py-2 pl-4 pr-4 ${
															active
																? "bg-slate-100 text-slate-900"
																: currentlySelected
																? "bg-slate-50"
																: "text-slate-600"
														}`}
													>
														{showImage &&
														option.images &&
														option.images.profile ? (
															<img
																src={option.images.profile}
																className="w-6 h-6 flex-none rounded-full overflow-hidden"
															/>
														) : (
															fallBackPrefix
														)}
														<span
															className={`block truncate ${
																currentlySelected
																	? "font-semibold text-slate-900"
																	: "font-normal"
															}`}
														>
															{displayValue ? option[displayValue] : option}
														</span>
													</li>
												)}
											</Combobox.Option>
										);
									})}
									{paddingBottom > 0 && (
										<div style={{ height: `${paddingBottom}px` }} />
									)}
								</>
							)}
							{allowCreateNew && (
								<Combobox.Option
									key={`create_new_${name}`}
									as={Fragment}
									value={`create_new_${name}`}
								>
									{({ active, selected }) => (
										<li
											className={`h-10 absolute w-full bottom-0 flex items-center gap-2 border-t border-slate-100 cursor-default select-none py-2 pl-4 pr-4 ${
												active
													? "bg-slate-100 text-slate-900"
													: "bg-white text-slate-600"
											}`}
										>
											<HiPlus className="w-4 h-4 flex-none rounded-full overflow-hidden" />

											<span
												className={`block truncate font-semibold ${
													active ? "text-slate-900" : "text-slate-600"
												}`}
											>
												Create new {name}
											</span>
										</li>
									)}
								</Combobox.Option>
							)}
						</Combobox.Options>
					</div>
				</Transition>
			</div>
		</Combobox>
	) : (
		<Listbox
			value={selectedOption}
			onChange={onChange}
			{...{ name: name || undefined, by: by || undefined }}
		>
			<div className="relative">
				<Listbox.Button as="div" ref={setReferenceElement}>
					{children}
				</Listbox.Button>
				<Transition
					as={Fragment}
					afterLeave={() => {
						if (!selfManagingSearch) {
							setSearchTerm!("");
							return;
						}

						setQuery("");
					}}
				>
					<div
						ref={setPopperElement}
						style={styles.popper}
						{...attributes.popper}
						className=" z-150 mt-1 max-h-60 w-64 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg  ring-1 ring-slate-900 ring-opacity-5  focus:outline-none sm:text-sm"
					>
						<Listbox.Options
							as={"div"}
							className={`focus-visible:ring-0 focus-visible:outline-none focus:ring-0 focus:outline-none`}
						>
							{filteredOptions.map((option) => (
								<Listbox.Option
									key={displayValue ? option[displayValue] : option}
									as={Fragment}
									value={option}
								>
									{({ active, selected }) => (
										<li
											className={`relative flex items-center gap-2 cursor-default select-none py-2 pl-4 pr-4 ${
												active
													? "bg-slate-100 text-slate-900"
													: "text-slate-600"
											}`}
										>
											{showImage && (
												<img
													src={option.image}
													className="w-5 h-5 flex-none rounded-full overflow-hidden"
												/>
											)}
											<span
												className={`block truncate ${
													selected ? "font-medium" : "font-normal"
												}`}
											>
												{displayValue ? option[displayValue] : option}
											</span>
										</li>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</div>
				</Transition>
			</div>
		</Listbox>
	);
};
