"use client";

import { Lilita_One } from "next/font/google";

const lilita = Lilita_One({ weight: "400", subsets: ["latin"] });

interface NoteTitleProps {
  title: string;
}

function NoteTitle({ title }: NoteTitleProps) {
  return (
    <h1 className={`text-secondary text-4xl sm:text-5xl ${lilita.className}`}>
      {title}
    </h1>
  );
}

export default NoteTitle;
