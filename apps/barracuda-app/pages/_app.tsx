import { ClerkProvider } from "@clerk/nextjs";
import { AppProps } from "next/app";
import { FC } from "react";
import "./styles.css";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	return (
		<ClerkProvider {...pageProps}>
			<Component {...pageProps} />
		</ClerkProvider>
	);
};

export default App;
