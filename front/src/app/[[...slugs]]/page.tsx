// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Input, Box, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import WordFlow from "@/components/WordFlow";
import { isValidDateSlug } from "@/lib/slugs/date-slug";
import { useRouter } from "next/navigation";

interface WordCount {
  id: number;
  date: string;
  word: string;
  count: number;
}

const HomePage: React.FC<{
  params: { slugs: string[] };
}> = ({ params: { slugs } }) => {
  const [selectedDate, setSelectedDate] = useState("2024-01-26");
  const [wordCounts, setWordCounts] = useState<WordCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (slugs && slugs.length > 0 && isValidDateSlug(slugs[0])) {
      setSelectedDate(slugs[0]);
    } else {
      router.push("/");
    }
  }, [slugs, router]);

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

    // router.push(`/${leafPath.host}/${leafPath.owner}/${leafPath.repo}/${path}`);
    window.history.replaceState(null, "", `/${selectedDate}`);
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
};

export default HomePage;
