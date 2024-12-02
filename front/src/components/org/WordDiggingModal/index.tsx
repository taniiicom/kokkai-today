import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { diggingWordState } from "@/states/diggingWordState"; // Recoil の状態
import {
  Box,
  Text,
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

// 型定義
interface Character {
  id: string;
  name: string;
  profile: string;
}

interface RecordItem {
  text: string; // 発言の内容
}

interface RecordMeta {
  casts: string[]; // 発言者リスト
  castGroup?: string; // 発言者のグループ（例: 政党名）
}

interface RecordData {
  id: string; // レコードのID
  meta: RecordMeta; // レコードのメタデータ
  items: RecordItem[]; // 発言のリスト
  issueID: string; // 国会会議のID
  publishedAt: string; // 公開日時を追加
}

interface BookCard {
  id: string; // 書籍カードのID
  publishedAt: string; // 公開日時
}

interface Result {
  bookCard: BookCard; // 書籍カード情報
  records: Omit<RecordData, "issueID">[]; // 会議の発言記録
  characters: Record<string, Character>; // 発言者情報
}

interface ApiResponse {
  results: Result[]; // APIの検索結果
}

const WordDiggingModal: React.FC = () => {
  const [diggingWord, setDiggingWord] = useRecoilState(diggingWordState); // 対象の状態を取得
  const [loading, setLoading] = useState(false); // ローディング状態
  const [records, setRecords] = useState<RecordData[]>([]); // 取得したレコードを格納
  const [characters, setCharacters] = useState<Record<string, Character>>({}); // 発言者情報

  // [animation] ふわっと表示 ^^
  const MotionBox = motion(Box); // framer-motion を使用したアニメーション付きボックス

  // [arc] diggingWordState の中身が `""` のとき, DiggingWordModal 非表示, 何らかの文字列が含まれた時に表示 ^^
  // diggingWord が "" のときはモーダルを閉じる
  const isVisible = diggingWord !== ""; // モーダルの表示状態

  // モーダルを閉じる処理
  const handleClose = () => {
    setDiggingWord(""); // 状態をリセットして非表示にする
    setRecords([]); // レコードをクリア
    setCharacters({}); // 発言者情報をクリア
  };

  // 日付を `yyyy/mm/dd` 形式にフォーマット
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は 0 ベース
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  // API からデータを取得する関数
  // [idea] `bunko.jp` さんとコラボ ^^
  const fetchRecords = async (keyword: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(
        `https://api.bunko.jp/api/search/keyword?query=${encodeURIComponent(
          keyword
        )}&startsWith=jp.go.ndl.kokkai`
      );

      const data = response.data;
      if (data.results) {
        const extractedRecords: RecordData[] = data.results.flatMap(
          (result) => {
            const issueID = result.bookCard.id.split(".").pop() || "unknown"; // issueID を抽出
            const publishedAt = result.bookCard.publishedAt; // 公開日時を取得
            return result.records.map((record) => ({
              ...record,
              issueID,
              publishedAt, // 各 record に publishedAt を追加
            }));
          }
        );
        setRecords(extractedRecords);
        setCharacters(data.results[0]?.characters || {});
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
            w="90vw"
            maxW="800px"
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
              <ModalBody overflowY="auto" maxH="calc(80vh - 120px)">
                <Box p={5}>
                  <Text
                    fontSize="40px"
                    color="teal.500"
                    textAlign="center"
                    fontWeight="semibold"
                    mb={4}
                  >
                    {diggingWord}
                  </Text>
                </Box>
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
                        const speakerId = record.meta.casts[0]; // 発言者ID
                        const speakerName =
                          characters[speakerId]?.name || "不明"; // 発言者名
                        const formattedDate = formatDate(record.publishedAt); // 日付をフォーマット

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
                                {speakerName} ({record.meta.castGroup || "不明"}
                                )
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {formattedDate}
                              </Text>
                            </HStack>
                            <Text fontSize="md" mb={2}>
                              {record.items[0]?.text || "発言内容なし"}
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
                <Box mt={6} textAlign="center"></Box>
              </ModalBody>
            </MotionBox>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default WordDiggingModal;
