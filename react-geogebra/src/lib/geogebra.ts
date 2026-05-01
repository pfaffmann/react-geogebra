export const loadScript = async (url: string, id: string) =>
	new Promise<void>((resolve, reject) => {
		let ready = false;
		const tag = document.querySelectorAll("script")[0];
		const script = document.createElement("script");

		script.crossOrigin = "";
		script.id = `${id}-script`;
		script.type = "text/javascript";
		script.src = url;

		const readyChanged = () => {
			if (!ready) {
				ready = true;
				resolve();
			}
		};

		document.addEventListener("readystatechange", readyChanged);

		script.addEventListener("load", readyChanged);

		script.addEventListener("error", () => {
			reject(new Error("Error loading script."));
		});

		script.addEventListener("abort", () => {
			reject(new Error("Script loading aborted."));
		});

		if (tag?.parentNode) {
			tag.parentNode.insertBefore(script, tag);
		}
	});

export const removeScript = (id: string) => {
	void new Promise<void>((resolve, reject) => {
		const script = document.querySelector(`#${id}-script`);

		if (script) {
			script.remove();
			resolve();
		} else {
			reject(new Error("Error removing script."));
		}
	});
};
