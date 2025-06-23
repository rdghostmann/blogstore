import { getFeaturedVideo } from "@/controllers/getFeaturedVideo"
import { getRelatedVideos } from "@/controllers/relatedVideos"
import VideoOfTheWeek from "./video-of-the-week"

export default async function VBlogComponent() {
  const featuredVideo = await getFeaturedVideo()
  const relatedVideos = await getRelatedVideos()

  console.log("Featured Video:", featuredVideo)
  console.log("Related Videos:", relatedVideos)

  return <VideoOfTheWeek featuredVideo={featuredVideo} relatedVideos={relatedVideos} />
}