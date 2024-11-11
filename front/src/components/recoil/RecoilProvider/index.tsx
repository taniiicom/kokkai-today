"use client";
// [tips] app-router 対応のため追加. recoil は client でしか使えないので, `use client` でラップする. ^^

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilProviderProps {
  children: ReactNode;
}

export const RecoilProvider: React.FC<RecoilProviderProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
