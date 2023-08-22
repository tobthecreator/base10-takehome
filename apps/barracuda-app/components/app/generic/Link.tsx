import React, { FC, forwardRef, LegacyRef, ReactNode } from "react";
import NextLink from "next/link";

export interface LinkProps {
	href: string;
	className?: string;
	newTab?: boolean;
	onClick?: (e?: React.MouseEvent) => void;
	children: ReactNode;
	ref?: LegacyRef<HTMLAnchorElement>;
	tabIndex?;
}

export const Link: FC<LinkProps> = forwardRef(
	({
		href,
		children,
		className,
		onClick,
		newTab = false,
		ref,
		tabIndex,
		...rest
	}) => {
		return (
			<NextLink href={href} passHref>
				<a
					className={className}
					target={newTab ? "_blank" : "_self"}
					onClick={onClick}
					{...rest}
					ref={ref}
					tabIndex={tabIndex}
				>
					{children}
				</a>
			</NextLink>
		);
	}
);
