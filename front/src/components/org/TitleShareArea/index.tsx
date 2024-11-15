import { selectedDateState } from "@/states/selectedDateState";
import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

// ShareData 型定義
type ShareData = {
  title: string;
  text: string;
  url: string;
};

// [uiux][design] タイトル, ハッシュタグ, QR コードが含まれる share エリア
// [uiux][design][idea] クリックで Share API ^^
const TitleShareArea: React.FC = () => {
  const [selectedDate] = useRecoilState(selectedDateState);

  const shareData: ShareData = {
    title: `#国会Today : ${selectedDate}`,
    text: `${selectedDate} の国会の全発言から抽出したキーワード`,
    url: `https://kokkai-today.taniii.com/${selectedDate}`,
  };

  const handleShare = async () => {
    try {
      // Web Share API がサポートされているか確認
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("共有に成功しました");
      } else {
        alert("このブラウザは Web Share API をサポートしていません");
      }
    } catch (error) {
      console.error("共有に失敗しました", error);
    }
  };

  return (
    <Box
      width="350px"
      height="170px"
      right="10px"
      top="10px"
      borderRadius={30}
      zIndex="overlay"
      bgColor="#ffffff00"
      position="fixed"
      boxShadow="0px 6px 10px rgba(0, 0, 0, 0.15), 0px 1px 18px rgba(0, 0, 0, 0.1), 0px 3px 5px rgba(0, 0, 0, 0.2)"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      transition="all 0.3s ease-out"
      _hover={{ transform: "scale(1.03)" }}
      onClick={() => {
        handleShare();
      }}
    >
      <Box p="15px">
        <Text
          fontSize="23px"
          fontWeight="600"
          fontFamily="Hiragino Kaku Gothic Pro, Meiryo, sans-serif" // 丸ゴシック系フォント
        >
          #国会Today
        </Text>
      </Box>
      <Image
        src="kokkai-today_qr_2.png"
        alt="National Diet Building"
        width="150px"
        height="150px"
        objectFit="cover"
        zIndex={-1}
      />
    </Box>
  );
};

export default TitleShareArea;
