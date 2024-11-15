import React from "react";

// ShareData 型定義
type ShareData = {
  title: string;
  text: string;
  url: string;
};

// Props 型定義
interface ShareButtonProps {
  shareData: ShareData;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareData }) => {
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

  return <button onClick={handleShare}>共有する</button>;
};

export default ShareButton;
