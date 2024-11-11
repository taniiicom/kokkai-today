"use client";

import { atom } from "recoil";

export const selectedDateState = atom<string>({
  key: "selectedDateState", // ユニークなキーを設定
  default: "2024-11-11", // 初期値
});
