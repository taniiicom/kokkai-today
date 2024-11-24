"use client";

import { atom } from "recoil";

export const diggingWordState = atom<string>({
  key: "diggingWordState", // ユニークなキーを設定
  default: "", // 初期値
});
