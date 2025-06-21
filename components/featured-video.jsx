// featured-video.jsx
import { Card, CardContent } from "./ui/card"
import { getFeaturedVideo } from "@/controllers/getFeaturedVideo"
import UserReactBtn from "./UserReactBtn/UserReactBtn"

export default async function FeaturedVideo() {
  const video = await getFeaturedVideo()

  if (!video) {
    return (
      <Card className="w-full max-w-3xl mx-auto overflow-hidden">
        <CardContent className="p-8 text-center">Loading featured video...</CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative">
          <iframe
            className="w-full h-full absolute"
            src={video.embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{video.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {video.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Posted on {new Date(video.date).toLocaleDateString()}
            </div>

            {/* Client Component for Interactivity */}
            <UserReactBtn
              initialLikes={video.likes || 0}
              initialDislikes={video.dislikes || 0}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
