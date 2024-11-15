import { selectedDateState } from "@/states/selectedDateState";
import { Box, Text, Image, Button, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { IoShareSocialSharp, IoLogoTwitter } from "react-icons/io5";

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
  // [tips] PC/SP 出しわけ. chakra-ui の機能 ^^
  const [isPC] = useMediaQuery("(min-width: 800px)");

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

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareData.text + " #国会Today\n"
  )}&url=${encodeURIComponent(shareData.url)}`;

  return (
    <Box
      width="350px"
      height="170px"
      right="10px"
      top={isPC ? "10px" : undefined}
      bottom={isPC ? undefined : "10px"}
      borderRadius={30}
      zIndex="overlay"
      bgColor={isPC ? "#ffffff00" : "#ffffffee"}
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
      <Box
        p="15px"
        zIndex="overlay"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box p="10px"></Box>
        <Text
          fontSize="23px"
          fontWeight="600"
          fontFamily="Hiragino Kaku Gothic Pro, Meiryo, sans-serif" // 丸ゴシック系フォント
          alignItems="center"
        >
          #国会Today
        </Text>
        <Box display="flex" flexDirection="row">
          <Button
            leftIcon={<IoLogoTwitter size="20px" />}
            colorScheme="cyan"
            variant="ghost"
            onClick={() => window.open(twitterShareUrl, "_blank")}
          >
            Tweet
          </Button>
          <Button
            leftIcon={<IoShareSocialSharp size="20px" />}
            colorScheme="cyan"
            variant="ghost"
          ></Button>
        </Box>
      </Box>
      <Image
        src="kokkai-today_qr_2.png"
        alt="National Diet Building"
        width="150px"
        height="150px"
        objectFit="cover"
        zIndex="overlay"
      />
    </Box>
  );
};

export default TitleShareArea;
