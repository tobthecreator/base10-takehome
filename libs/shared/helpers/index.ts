export * from "./mongoose.helpers";
export * from "./socket.helpers";

export const CapitalizeFirstLetters = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export const AddHttpsToURL = (url: string) => {
	if (url === "" || !url) return "";

	if (url.includes("https://") || url.includes("localhost:")) {
		return url;
	}

	if (url.includes("http://")) {
		return url.replace("http://", "https://");
	}

	return `https://${url}`;
};
