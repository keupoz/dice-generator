import { FC, PropsWithChildren } from "react";

export const LargeText: FC<PropsWithChildren> = ({ children }) => {
  return <div className="text-lg font-semibold">{children}</div>;
};
