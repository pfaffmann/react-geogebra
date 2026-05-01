import type { PropsWithChildren } from "react";

export const LoadComponent = ({ children }: PropsWithChildren) => {
	return <h3>{children}</h3>;
};
