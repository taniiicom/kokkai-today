// app/api/wordcounts/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/infra/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "日付が無効です" }, { status: 400 });
  }

  const selectedDate = new Date(date);

  try {
    const wordCounts = await prisma.wordCount.findMany({
      where: {
        date: selectedDate,
      },
      orderBy: {
        count: "desc",
      },
    });

    return NextResponse.json(wordCounts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
