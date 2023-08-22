import { EditorContent, Extension, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
	FaBold,
	FaItalic,
	FaList,
	FaListOl,
	FaListUl,
	FaStrikethrough,
} from "react-icons/fa";
import IconButton from "./IconButton";
import Tippy from "@tippyjs/react";
import { useRef, useState } from "react";
import { HiLink } from "react-icons/hi";
import Button from "./Button";
import { AddHttpsToURL } from "libs/shared/helpers";

export default ({
	value,
	onChange,
	placeholder,
	className,
	autofocus = true,
	showFixedMenu = true,
}: {
	value: string;
	onChange: (e: any) => void;
	placeholder: string;
	className?: string;
	autofocus?: boolean;
	showFixedMenu?: boolean;
}) => {
	const CustomSubmit = Extension.create({
		name: "customSubmit",
		addKeyboardShortcuts() {
			return {
				"Mod-Enter": () => true,
			};
		},
	});

	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder,
			}),
			CustomSubmit,
			Link.configure({
				openOnClick: false,
			}).extend({
				inclusive: false,
			}),
		],
		content: value,
		autofocus,
		onUpdate: ({ editor }) => {
			const newContent = editor.getHTML();
			onChange(newContent);
		},
	});

	const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
	const [link, setLink] = useState<string>("");

	const [errors, setErrors] = useState<any>({});

	const validateUrl = (url) => {
		const urlRegex =
			/(?:^|[ \t])((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/gm;

		const isValid = urlRegex.test(url);

		return isValid;
	};

	const linkInputRef = useRef<HTMLInputElement | null>(null);

	const menuButtons = editor && (
		<>
			<IconButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				icon={
					<FaBold
						className={
							editor.isActive("bold")
								? "text-slate-900"
								: "text-slate-500 hover:text-slate-600"
						}
					/>
				}
				tooltip="Bold"
				size="small"
			/>
			<IconButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				icon={
					<FaItalic
						className={
							editor.isActive("italic")
								? "text-slate-900"
								: "text-slate-500 hover:text-slate-600"
						}
					/>
				}
				tooltip="Italic"
				size="small"
			/>
			<IconButton
				onClick={() => editor.chain().focus().toggleStrike().run()}
				icon={
					<FaStrikethrough
						className={
							editor.isActive("strike")
								? "text-slate-900"
								: "text-slate-500 hover:text-slate-600"
						}
					/>
				}
				tooltip="Strikethrough"
				size="small"
			/>
			<div className="w-0.5 bg-slate-100 h-4 mx-1"></div>
			<IconButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				icon={
					<FaListUl
						className={
							editor.isActive("bulletList")
								? "text-slate-900"
								: "text-slate-500 hover:text-slate-600"
						}
					/>
				}
				tooltip="Bullet List"
				size="small"
			/>
			<IconButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				icon={
					<FaListOl
						className={
							editor.isActive("orderedList")
								? "text-slate-900"
								: "text-slate-500 hover:text-slate-600"
						}
					/>
				}
				tooltip="Numbered List"
				size="small"
			/>
			<div className="w-0.5 bg-slate-100 h-4 mx-1"></div>

			<Tippy
				theme="none"
				content={
					<form
						onSubmit={(e) => {
							let selectEnd;
							e.preventDefault();
							e.stopPropagation();
							if (validateUrl(link)) {
								editor
									.chain()
									.focus()
									.extendMarkRange("link")
									.setLink({ href: AddHttpsToURL(link) })
									.command(({ state }) => {
										// manipulate the transaction
										selectEnd = state.selection.to;
										return true;
									})
									.run();
								editor.chain().setTextSelection(selectEnd).run();
								setShowLinkInput(false);
							} else {
								setErrors({ link: "Invalid url" });
							}
						}}
						className="bg-white rounded-sm border border-slate-100 shadow-md py-1 pl-2 pr-1 flex items-center gap-1 max-w-sm w-full"
					>
						<input
							value={link}
							onChange={(e) => {
								setLink(e.target.value);
							}}
							placeholder="Add a link..."
							className={` grow w-48 text-sm ${
								errors.link
									? `bg-rose-50 text-rose-600 focus-within:bg-rose-50 ring-1 ring-rose-600 hover:text-rose-600 border-rose-600`
									: `text-slate-600 placeholder:text-sm focus-within:ring-0 ring-0 outline-0 border-0 focus-visible:ring-0 focus-within:border-transparent `
							}`}
							autoFocus={true}
							ref={linkInputRef}
						/>
						<Button
							size="xs"
							disabled={link === "" || !validateUrl(link)}
							type="submit"
						>
							Save
						</Button>
					</form>
				}
				placement="top"
				offset={[0, 3]}
				arrow={false}
				delay={200}
				visible={showLinkInput}
				onClickOutside={() => setShowLinkInput(false)}
				interactive={true}
				onShown={() => {
					if (linkInputRef.current) linkInputRef.current.focus();
				}}
			>
				<IconButton
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						if (editor.isActive("link")) {
							editor.chain().focus().unsetLink().run();
						} else {
							setLink("");
							setErrors({});
							setShowLinkInput(true);
						}
					}}
					icon={
						<HiLink
							className={
								editor.isActive("link")
									? "text-slate-900"
									: "text-slate-500 hover:text-slate-600"
							}
						/>
					}
					tooltip={editor.isActive("link") ? "Remove Link" : "Add Link"}
					size="small"
				/>
			</Tippy>
		</>
	);

	return (
		<>
			{/* <MenuBar editor={editor} /> */}
			{editor && (
				<BubbleMenu
					editor={editor}
					tippyOptions={{ duration: 100, theme: "none", arrow: false }}
					className="hidden sm:flex items-center bg-white shadow-md px-1 rounded-md overflow-hidden py-1 -mb-1"
				>
					{menuButtons}
				</BubbleMenu>
			)}

			{editor && showFixedMenu && (
				<div className="absolute text-sm top-0 left-0 flex sm:hidden items-center px-1.5 rounded-md  py-2 ">
					{menuButtons}
				</div>
			)}
			<EditorContent editor={editor} className={className} />
		</>
	);
};
