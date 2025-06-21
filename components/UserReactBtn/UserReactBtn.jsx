"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "../ui/button"

export default function UserReactBtn({ initialLikes, initialDislikes }) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [userAction, setUserAction] = useState(null)

  const handleLike = () => {
    if (userAction === "like") {
      setLikes(likes - 1)
      setUserAction(null)
    } else {
      setLikes(likes + 1)
      if (userAction === "dislike") {
        setDislikes(dislikes - 1)
      }
      setUserAction("like")
    }
  }

  const handleDislike = () => {
    if (userAction === "dislike") {
      setDislikes(dislikes - 1)
      setUserAction(null)
    } else {
      setDislikes(dislikes + 1)
      if (userAction === "like") {
        setLikes(likes - 1)
      }
      setUserAction("dislike")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${userAction === "like" ? "text-primary" : ""}`}
        onClick={handleLike}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likes}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${userAction === "dislike" ? "text-primary" : ""}`}
        onClick={handleDislike}
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{dislikes}</span>
      </Button>
    </div>
  )
}
