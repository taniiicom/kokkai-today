"use client";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light", // デフォルトは "light"
  useSystemColorMode: false, // システムのカラーモードに従うかどうか
};

const theme = extendTheme({ config });

export default theme;
