// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedDateState } from "@/states/selectedDateState";
import { Input, Box, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import WordFlow from "@/components/WordFlow";
import { isValidDateSlug } from "@/lib/slugs/date-slug";
import { useRouter } from "next/navigation";
import SidePanel from "@/components/org/SidePanel";

interface WordCount {
  id: number;
  date: string;
  word: string;
  count: number;
}

const HomePage: React.FC<{
  params: { slugs: string[] };
}> = ({ params: { slugs } }) => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [wordCounts, setWordCounts] = useState<WordCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (slugs && slugs.length > 0 && isValidDateSlug(slugs[0])) {
      setSelectedDate(slugs[0]);
    } else {
      router.push("/" + new Date().toISOString().slice(0, 10));
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
    <Box height="100%" p={0}>
      <SidePanel />
      {loading ? (
        <Box pl="100px" pt={7}>
          <Spinner mt={4} />
        </Box>
      ) : error ? (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      ) : wordCounts.length > 0 ? (
        <WordFlow wordCounts={wordCounts} />
      ) : selectedDate ? (
        <Box pl="100px" pt={7}>
          <Text>
            データがありません. <br />
            他の日を選択してください.
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default HomePage;
