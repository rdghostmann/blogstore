import mongoose from "mongoose"

const categories = [
  "Movies",
  "Music",
  "TV Shows",
  "Film Industry",
  "Gaming",
  "Pop Culture"
]

export const mockBlogPosts = [
  // Pinky (admin) posts
  {
    title: "Welcome to the Blog Store!",
    excerpt: "Discover the latest updates and features of our platform.",
    content: `
      <p>Blockbusters are more than just big budgets. Discover the artistry and teamwork behind the scenes.</p>
      <ul>
        <li><strong>1. Motion Capture</strong> – Bringing digital characters to life.</li>
        <li><strong>2. Practical Effects</strong> – Old-school tricks still in use.</li>
        <li><strong>3. CGI Innovations</strong> – Pushing the boundaries of imagination.</li>
        <li><strong>4. Stunt Coordination</strong> – Keeping action safe and thrilling.</li>
        <li><strong>5. Sound Design</strong> – The unsung hero of immersion.</li>
      </ul>
    `,
    date: new Date("2025-05-25"),
    authorId: new mongoose.Types.ObjectId("6832bb478d42769853c546fa"),
    authorName: "Pinky",
    category: categories[0],
    status: "published",
    image: "/placeholder-music.png"
  },
  {
    title: "Admin's Guide to Blog SEO",
    excerpt: "How to optimize your blog posts for search engines.",
    content: "Learn the basics of SEO and how to apply them to your blog for better visibility.",
    date: new Date("2025-05-26"),
    authorId: new mongoose.Types.ObjectId("6832bb478d42769853c546fa"),
    authorName: "Pinky",
    category: categories[1],
    status: "published",
    image: "/placeholder-music.png"
  },
  {
    title: "Content Planning for Admins",
    excerpt: "Tips for planning your content calendar.",
    content: "A well-planned content calendar helps keep your blog consistent and engaging.",
    date: new Date("2025-05-27"),
    authorId: new mongoose.Types.ObjectId("6832bb478d42769853c546fa"),
    authorName: "Pinky",
    category: categories[2],
    status: "published",
    image: "/placeholder-scence.png"
  },
  {
    title: "Managing Comments Effectively",
    excerpt: "Best practices for moderating blog comments.",
    content: "Keep your community healthy by moderating comments with fairness and transparency.",
    date: new Date("2025-05-28"),
    authorId: new mongoose.Types.ObjectId("6832bb478d42769853c546fa"),
    authorName: "Pinky",
    category: categories[3],
    status: "published",
    image: "/placeholder-scence.png"
  },
  {
    title: "How to Feature Guest Writers",
    excerpt: "Expand your blog with guest contributions.",
    content: "Guest writers can bring new perspectives and audiences to your platform.",
    date: new Date("2025-05-29"),
    authorId: new mongoose.Types.ObjectId("6832bb478d42769853c546fa"),
    authorName: "Pinky",
    category: categories[4],
    status: "published",
    image: "/placeholder-shows.png"
  },
  {
    title: "Blog Analytics for Admins",
    excerpt: "Understanding your blog's performance.",
    content: "Track your blog's growth and engagement with analytics tools.",
    date: new Date("2025-05-30"),
    authorId: new mongoose.Types.ObjectId("6832bb478d42769853c546fa"),
    authorName: "Pinky",
    category: categories[5],
    status: "published",
    image: "/placeholder-shows.png"
  },

  // Regular User posts
  {
    title: "How to Write Your First Blog Post",
    excerpt: "A quick guide for new users to start blogging.",
    content: "Step 1: Sign up. Step 2: Click 'New Post'. Step 3: Start writing!",
    date: new Date("2025-05-25"),
    authorId: new mongoose.Types.ObjectId("6832bb488d42769853c546fd"),
    authorName: "Regular User",
    category: categories[0],
    status: "published",
    image: "/placeholder-movie.png "
  },
  {
    title: "My Blogging Journey",
    excerpt: "Sharing my experience as a new blogger.",
    content: "Starting a blog was intimidating, but here's how I overcame my fears.",
    date: new Date("2025-05-26"),
    authorId: new mongoose.Types.ObjectId("6832bb488d42769853c546fd"),
    authorName: "Regular User",
    category: categories[1],
    status: "published",
    image: "/placeholder-pop.png"
  },
  {
    title: "Favorite Writing Tools",
    excerpt: "Apps and tools that help me write better.",
    content: "From note-taking apps to grammar checkers, these tools boost my productivity.",
    date: new Date("2025-05-27"),
    authorId: new mongoose.Types.ObjectId("6832bb488d42769853c546fd"),
    authorName: "Regular User",
    category: categories[2],
    status: "published",
    image: "/placeholder-pop.png"
  },
  {
    title: "How I Find Inspiration",
    excerpt: "Tips for overcoming writer's block.",
    content: "Inspiration can come from anywhere—here's how I stay motivated.",
    date: new Date("2025-05-28"),
    authorId: new mongoose.Types.ObjectId("6832bb488d42769853c546fd"),
    authorName: "Regular User",
    category: categories[3],
    status: "published",
    image: "/placeholder-shows.png"
  },
  {
    title: "Connecting with Other Bloggers",
    excerpt: "Building a community around your blog.",
    content: "Networking with other bloggers has helped me grow and learn.",
    date: new Date("2025-05-29"),
    authorId: new mongoose.Types.ObjectId("6832bb488d42769853c546fd"),
    authorName: "Regular User",
    category: categories[4],
    status: "published",
    image: "/placeholder-shows.png"
  },
  {
    title: "What I Learned in My First Month",
    excerpt: "Reflections after a month of blogging.",
    content: "Consistency, engagement, and authenticity are key lessons from my first month.",
    date: new Date("2025-05-30"),
    authorId: new mongoose.Types.ObjectId("6832bb488d42769853c546fd"),
    authorName: "Regular User",
    category: categories[5],
    status: "published",
    image: "/placeholder-shows.png"
  }
]