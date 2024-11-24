import React from "react";
import { useRecoilState } from "recoil";
import { diggingWordState } from "@/states/diggingWordState"; // Recoil の状態
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const WordDiggingModal: React.FC = () => {
  const [diggingWord, setDiggingWord] = useRecoilState(diggingWordState); // 対象の状態を取得

  // [animation] ふわっと表示 ^^
  const MotionBox = motion(Box); // framer-motion を使用したアニメーション付きボックス

  // [arc] diggingWordState の中身が `""` のとき, DiggingWordModal 非表示, 何らかの文字列が含まれた時に表示 ^^
  // diggingWord が "" のときはモーダルを閉じる
  const isVisible = diggingWord !== ""; // モーダルの表示状態

  // モーダルを閉じる処理
  const handleClose = () => {
    setDiggingWord(""); // 状態をリセットして非表示にする
  };

  return (
    <>
      {/* モーダルの表示ロジック */}
      {isVisible && (
        <Modal isOpen={isVisible} onClose={handleClose} isCentered>
          {/* [design][uiux] モーダルの外側タップで非表示 ^^ */}
          <ModalOverlay />
          <ModalContent
            bg="white"
            borderRadius="20px"
            boxShadow="lg"
            overflow="hidden"
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ModalHeader>Word Digging</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  選択されたワード:
                </Text>
                <Text
                  fontSize="xl"
                  color="teal.500"
                  textAlign="center"
                  fontWeight="semibold"
                >
                  {diggingWord}
                </Text>
                <Box mt={6} textAlign="center">
                  <Button colorScheme="teal" onClick={handleClose}>
                    Close
                  </Button>
                </Box>
              </ModalBody>
            </MotionBox>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default WordDiggingModal;
