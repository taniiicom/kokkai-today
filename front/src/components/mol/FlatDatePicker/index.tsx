import React from "react";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectedDateState } from "@/states/selectedDateState";

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

const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  return (
    <div>
      <DatePicker
        selected={parseDate(selectedDate)}
        onChange={(date) => {
          if (date) {
            setSelectedDate(formatDate(date));
          }
        }}
        inline
      />
    </div>
  );
};

export default MyDatePicker;
