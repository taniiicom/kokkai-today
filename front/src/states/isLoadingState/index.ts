"use client";

import { atom } from "recoil";

export const isLoadingState = atom<boolean>({
  key: "isLoadingState", // ユニークなキーを設定
  default: false, // 初期値
});
