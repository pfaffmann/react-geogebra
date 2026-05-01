import type { GeoGebraProps } from "../types/geogebra";

import { useGeoGebra } from "../hooks/useGeoGebra";
import { LoadComponent as DefaultLoadComponent } from "./LoadComponent";

export const GeoGebra = (props?: GeoGebraProps) => {
	const {
		appName = "classic",
		debug = false,
		height = 600,
		id = "ggb-applet",
		LoadComponent = DefaultLoadComponent,
		showAlgebraInput = true,
		showMenuBar = true,
		showToolBar = true,
		width = 800,
		...rest
	} = props ?? {};

	const { loading } = useGeoGebra({
		appName,
		debug,
		height,
		id,
		LoadComponent,
		showAlgebraInput,
		showMenuBar,
		showToolBar,
		width,
		...rest,
	});

	return (
		<div id={`${id}-holder`}>
			{loading && <LoadComponent>Loading...</LoadComponent>}
			<div id={id} />
		</div>
	);
};
