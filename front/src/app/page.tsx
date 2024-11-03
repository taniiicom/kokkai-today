// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Input, Box, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import WordFlow from "../components/WordFlow";

interface WordCount {
  id: number;
  date: string;
  word: string;
  count: number;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [wordCounts, setWordCounts] = useState<WordCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      setError("");
      axios
        .get("/api/wordcounts", { params: { date: selectedDate } })
        .then((response) => {
          setWordCounts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("データの取得に失敗しました", error);
          setError("データの取得に失敗しました");
          setLoading(false);
        });
    } else {
      setWordCounts([]);
    }
  }, [selectedDate]);

  return (
    <Box p={4} height="100%">
      <Input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        placeholder="日付を選択してください"
      />
      {loading ? (
        <Spinner mt={4} />
      ) : error ? (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      ) : wordCounts.length > 0 ? (
        <WordFlow wordCounts={wordCounts} />
      ) : selectedDate ? (
        <Text mt={4}>データがありません</Text>
      ) : null}
    </Box>
  );
}
