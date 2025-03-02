import { HTMLAttributes } from "react";

interface SubtaskTitle extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export default function SubtaskTitle({ text }: SubtaskTitle) {
  return <h4>{text}</h4>;
}
