// components/WordFlow.tsx
"use client";

import { Box, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface WordCount {
  id: number;
  word: string;
  count: number;
}

interface WordFlowProps {
  wordCounts: WordCount[];
}

const MotionBox = motion(Box);

export default function WordFlow({ wordCounts }: WordFlowProps) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      width="100vw"
      height="90vh" // 画面全体の高さ
      mt={4}
    >
      {/* 下部に固定する背景画像 */}
      <Image
        src="parliament_alpha.png"
        alt="National Diet Building"
        position="absolute"
        bottom="0"
        width="100%"
        height="700px" // 必要に応じて調整
        objectFit="cover"
        zIndex={1}
      />
      <Image
        src="kokkai-today_qr_2.png"
        alt="National Diet Building"
        position="absolute"
        width="350px"
        height="350px"
        right="100px"
        top="10px"
        objectFit="cover"
        zIndex={-1}
      />
      <Text
        position="absolute"
        right="190px"
        top="330px"
        zIndex={-1}
        fontSize="30px"
        fontFamily="Hiragino Kaku Gothic Pro, Meiryo, sans-serif" // 丸ゴシック系フォント
      >
        #今日の国会
        <br />
        #明日の索引
      </Text>

      {/* 単語のアニメーション */}
      {wordCounts.map((wordCount, index) => {
        const fontSize = Math.min(50, wordCount.count * 2); // フォントサイズを調整
        const randomLeftPosition = Math.random() * 100; // 左右ランダム位置（0〜100%）
        const animationDuration = 15 + Math.random() * 5; // アニメーションの持続時間
        const animationDelay = index * 1; // アニメーションの開始をずらす
        const randomOpacity = 0.3 + Math.random() * 0.7; // ランダムな透明度 (0.3〜1.0)

        return (
          <MotionBox
            key={wordCount.id}
            position="absolute"
            bottom={`-${fontSize * 2}px`} // 単語の高さを考慮して調整
            left={`${randomLeftPosition}%`} // 左右ランダムに配置
            initial={{ y: 0 }}
            animate={{ y: `-${window.innerHeight + fontSize * 2}px` }} // 画面上部の外まで移動
            transition={{
              duration: animationDuration,
              delay: animationDelay,
              repeat: Infinity,
            }}
            zIndex={0} // 単語が画像の上を流れるように
          >
            <Text
              fontSize={`${fontSize}px`}
              fontWeight="bold"
              color={`rgba(0, 85, 200, ${randomOpacity})`} // ランダムな薄さの緑色
              fontFamily="Hiragino Kaku Gothic Pro, Meiryo, sans-serif" // 丸ゴシック系フォント
            >
              {wordCount.word}
            </Text>
          </MotionBox>
        );
      })}
    </Box>
  );
}
