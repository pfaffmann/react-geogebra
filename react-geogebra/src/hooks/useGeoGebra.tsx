/* eslint-disable unicorn/prefer-global-this */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, useState } from "react";

import type { GeoGebraProps } from "../types/geogebra";

import { loadScript } from "../lib/geogebra";

export const useGeoGebra = (props: GeoGebraProps) => {
	const refProps = useRef<GeoGebraProps>(props);
	const { appletOnLoad, debug, id = "ggb-applet", onReady } = props;
	const url = "https://geogebra.org/apps/deployggb.js";
	const [deployggbLoaded, setDeployggbLoaded] = useState(false);
	const [loading, setLoading] = useState(true);
	const [watchPropertiesChange, setWatchPropertiesChange] = useState(false);

	// gets called by GeoGebra after the Applet is ready
	const onAppletReady = () => {
		if (appletOnLoad) appletOnLoad();

		if (onReady) onReady();

		if (debug) console.log(`Applet with id "${id}" is ready`);
	};

	useEffect(() => {
		const load = async () => {
			try {
				await loadScript(url, id);
				setDeployggbLoaded(true);

				if (debug) {
					console.log(
						`script from "${url}" succesfull loaded into the DOM`,
					);
				}

				if (window.GGBApplet) {
					const parameter = structuredClone(refProps.current);

					parameter.appletOnLoad = onAppletReady;

					const ggbApp = new window.GGBApplet(parameter, true);

					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					ggbApp.inject(id);
					setLoading(false);
					setWatchPropertiesChange(false);

					if (debug) {
						console.log(
							`applet with id "${id}" succesfull injected into the DOM`,
						);
					}
				}
			} catch (error) {
				console.error(error);
			}
		};

		void load();

		return () => {
			setDeployggbLoaded(false);

			// removeScript(id);
			const tag = document.querySelector(`#${id}-holder`);

			if (tag?.lastChild) {
				tag.lastChild.textContent = "";
			}
		};
	});

	useEffect(() => {
		return () => {
			const tag = document.querySelector(`#${id}-holder`);

			if (tag?.lastChild) {
				tag.lastChild.textContent = "";
			}
		};
	}, [id, deployggbLoaded, watchPropertiesChange]);

	return { loading };
};
