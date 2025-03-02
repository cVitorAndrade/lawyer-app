import { HTMLAttributes } from "react"

interface TaskCardRootProps extends HTMLAttributes<HTMLDivElement> {}

export default function TaskCardRoot ({
  children
}: TaskCardRootProps) {
  return (
    <div className="bg-white border rounded-lg shadow-md">
      {children}
    </div>
  )
}