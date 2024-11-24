import React, { useEffect, useState } from "react";
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
  Spinner,
  VStack,
  Link,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";

const WordDiggingModal: React.FC = () => {
  const [diggingWord, setDiggingWord] = useRecoilState(diggingWordState); // 対象の状態を取得
  const [loading, setLoading] = useState(false); // ローディング状態
  const [records, setRecords] = useState<any[]>([]); // 取得したレコードを格納

  // [animation] ふわっと表示 ^^
  const MotionBox = motion(Box); // framer-motion を使用したアニメーション付きボックス

  // [arc] diggingWordState の中身が `""` のとき, DiggingWordModal 非表示, 何らかの文字列が含まれた時に表示 ^^
  // diggingWord が "" のときはモーダルを閉じる
  const isVisible = diggingWord !== ""; // モーダルの表示状態

  // モーダルを閉じる処理
  const handleClose = () => {
    setDiggingWord(""); // 状態をリセットして非表示にする
    setRecords([]); // レコードをクリア
  };

  // API からデータを取得する関数
  // [idea] `bunko.jp` さんとコラボ ^^
  const fetchRecords = async (keyword: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.bunko.jp/api/search/keyword?query=${encodeURIComponent(
          keyword
        )}&startsWith=jp.go.ndl.kokkai`
      );
      const data = response.data;
      if (data.results) {
        const extractedRecords = data.results.flatMap((result: any) => {
          const issueID = result.bookCard.id.split(".").pop(); // issueID を抽出
          return result.records.map((record: any) => ({
            ...record,
            issueID,
          }));
        });
        setRecords(extractedRecords);
      }
    } catch (error) {
      console.error("データの取得に失敗しました", error);
    } finally {
      setLoading(false);
    }
  };

  // diggingWord が変更されたときにデータを取得
  useEffect(() => {
    if (diggingWord) {
      fetchRecords(diggingWord);
    }
  }, [diggingWord]);

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
            maxW="90vw"
            maxH="80vh"
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ModalHeader>Word Digging</ModalHeader>
              <ModalCloseButton />
              <ModalBody overflowY="auto">
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  選択されたワード:
                </Text>
                <Text
                  fontSize="xl"
                  color="teal.500"
                  textAlign="center"
                  fontWeight="semibold"
                  mb={4}
                >
                  {diggingWord}
                </Text>
                {/* [uiux][design][animation] loading, 下からふわっと表示, リスト表示デザイン ^^ */}
                {loading ? (
                  <Box textAlign="center">
                    <Spinner size="xl" />
                    <Text mt={2}>データを探索しています...</Text>
                  </Box>
                ) : (
                  <VStack spacing={4} align="stretch">
                    {records.length > 0 ? (
                      records.map((record) => {
                        const speechID = record.id; // speechID を取得
                        const link = `https://kokkai.bunko.jp/books/jp.go.ndl.kokkai.${record.issueID}#${speechID}`;
                        return (
                          <Box
                            key={record.id}
                            p={4}
                            borderWidth="1px"
                            borderRadius="md"
                            boxShadow="sm"
                          >
                            <HStack justify="space-between" mb={2}>
                              <Text fontSize="sm" color="gray.500">
                                発言者: {record.meta.casts[0] || "不明"} (
                                {record.meta.castGroup || "不明"})
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                日時:{" "}
                                {new Date(
                                  record.meta.creationTime
                                ).toLocaleDateString() || "不明"}
                              </Text>
                            </HStack>
                            <Text fontSize="md" mb={2}>
                              {record.items[0].text}
                            </Text>
                            <Link href={link} color="blue.500" isExternal>
                              詳細を見る
                            </Link>
                          </Box>
                        );
                      })
                    ) : (
                      <Text>該当する発言が見つかりませんでした。</Text>
                    )}
                  </VStack>
                )}
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
