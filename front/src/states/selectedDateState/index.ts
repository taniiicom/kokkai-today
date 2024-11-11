"use client";

import { atom } from "recoil";

export const selectedDateState = atom<string>({
  key: "selectedDateState", // ユニークなキーを設定
  default: "2024-01-26", // 初期値
});
