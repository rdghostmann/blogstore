"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, Flag, MoreHorizontal, Heart, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const sampleComments = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "This is such an insightful article! I've been following AI developments for years, and this really captures the current state perfectly. The examples you provided are spot-on.",
    timestamp: "2 hours ago",
    likes: 24,
    dislikes: 2,
    replies: [
      {
        id: 11,
        author: {
          name: "Mike Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: false,
        },
        content: "Totally agree! The AI integration examples were really helpful.",
        timestamp: "1 hour ago",
        likes: 8,
        dislikes: 0,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content:
      "Great read! I'm curious about the privacy implications though. How do you think we can balance AI convenience with data protection?",
    timestamp: "4 hours ago",
    likes: 15,
    dislikes: 1,
    replies: [],
  },
  {
    id: 3,
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "The section about predictive health monitoring really caught my attention. This could revolutionize healthcare accessibility in remote areas.",
    timestamp: "6 hours ago",
    likes: 32,
    dislikes: 0,
    replies: [
      {
        id: 31,
        author: {
          name: "Dr. James Park",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
        },
        content:
          "As a healthcare professional, I can confirm this technology is already showing promising results in clinical trials.",
        timestamp: "5 hours ago",
        likes: 18,
        dislikes: 0,
      },
    ],
  },
]


export default function CommentsSection({ postId, totalComments = 24 }) {
  const [comments, setComments] = useState(sampleComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleSubmitReply = (parentId) => {
    if (!replyText.trim()) return

    const reply = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      content: replyText,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
    }

    setComments(
      comments.map((comment) =>
        comment.id === parentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
      ),
    )
    setReplyText("")
    setReplyingTo(null)
  }

  const handleLike = (commentId, isReply = false, parentId) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply,
                ),
              }
            : comment,
        ),
      )
    } else {
      setComments(
        comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
      )
    }
  }

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-primary-600" />
          <h2 className="text-2xl font-bold">Comments ({totalComments})</h2>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border rounded-md px-3 py-1 bg-white dark:bg-gray-800"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Comment Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-4 min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Be respectful and constructive</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setNewComment("")}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                {/* Main Comment */}
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">{comment.author.name}</h4>
                      {comment.author.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                      <span className="text-sm text-gray-500">{comment.timestamp}</span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{comment.content}</p>

                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(comment.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-primary-600"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{comment.likes}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 text-gray-500 hover:text-red-600"
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>{comment.dislikes}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-primary-600"
                      >
                        <Reply className="h-4 w-4" />
                        <span>Reply</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 text-gray-500 hover:text-primary-600"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Flag className="h-4 w-4 mr-2" />
                            Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Heart className="h-4 w-4 mr-2" />
                            Save
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your avatar" />
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder={`Reply to ${comment.author.name}...`}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="mb-2 min-h-[80px]"
                            />
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleSubmitReply(comment.id)}
                                disabled={!replyText.trim()}
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-6 pl-12 space-y-4">
                    {comment.replies.map((reply, replyIndex) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: replyIndex * 0.1 }}
                        className="border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                      >
                        <div className="flex space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                            <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-medium text-sm">{reply.author.name}</h5>
                              {reply.author.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500">{reply.timestamp}</span>
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{reply.content}</p>

                            <div className="flex items-center space-x-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLike(reply.id, true, comment.id)}
                                className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 text-xs"
                              >
                                <ThumbsUp className="h-3 w-3" />
                                <span>{reply.likes}</span>
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 text-xs"
                              >
                                <Reply className="h-3 w-3" />
                                <span>Reply</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More Comments */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Comments
        </Button>
      </div>
    </section>
  )
}
