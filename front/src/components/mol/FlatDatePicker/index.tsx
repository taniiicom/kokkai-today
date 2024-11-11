import React from "react";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectedDateState } from "@/states/selectedDateState";
import { Global, css } from "@emotion/react";
import { Box, Input } from "@chakra-ui/react";

// 日付の文字列を Date オブジェクトに変換する関数
const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Date オブジェクトを "yyyy-mm-dd" 形式の文字列に変換する関数
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// CSSをTypeScriptのオブジェクトで定義
const datePickerStyles = css({
  ".react-datepicker": {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#333",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  ".react-datepicker__header": {
    backgroundColor: "#fff",
    borderBottom: "1px solid #ccc",
    paddingTop: "8px",
  },
  ".react-datepicker__current-month": {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#333",
  },
  ".react-datepicker__day-names": {
    marginTop: "8px",
  },
  ".react-datepicker__day-name": {
    fontSize: "0.75rem",
    color: "#666",
  },
  ".react-datepicker__day": {
    width: "2rem",
    lineHeight: "2rem",
    margin: "0.1rem",
    fontSize: "0.875rem",
    color: "#333",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  ".react-datepicker__day--selected": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
  ".react-datepicker__day--today": {
    fontWeight: 700,
  },
});

const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  return (
    <div>
      <Box py={2}>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          placeholder="日付を選択してください"
          py={2}
        />
      </Box>
      <Global styles={datePickerStyles} />
      <Box py={2}>
        <DatePicker
          selected={parseDate(selectedDate)}
          onChange={(date) => {
            if (date) {
              setSelectedDate(formatDate(date));
            }
          }}
          inline
        />
      </Box>
    </div>
  );
};

export default MyDatePicker;
