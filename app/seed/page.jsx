import mongoose from "mongoose"
import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"

export const dynamic = "force-dynamic"

const users = [
  {
    id: '6843d2c980c1994a49016e1d',
    username: 'admin@example.com',
  },
  {
    id: '685925e8ec5b783e5576952d',
    username: 'pinky20@gmail.com',
  }
]

const samplePost = {
  title: "The Future of AI in Everyday Technology: How Machine Learning is Reshaping Our Digital Lives",
  excerpt: "How artificial intelligence is transforming our daily lives and what to expect in the coming years.",
  category: "Technology",
  image: "/placeholder.svg?height=600&width=1200",
  author: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Tech journalist and AI researcher with over 10 years of experience covering emerging technologies.",
    social: {
      twitter: "@alexjohnson",
      linkedin: "alexjohnson",
    },
  },
  date: new Date("2023-05-28"),
  readTime: "8 min read",
  views: 2547,
  comments: 24,
  authorId: new mongoose.Types.ObjectId(users[0].id),
  status: "published",
  slug: "the-future-of-ai-in-everyday-technology",
  tags: ["AI", "Machine Learning", "Technology", "Future Tech"],
  content: `
    <p>Artificial Intelligence has moved from the realm of science fiction into our daily lives, transforming how we interact with technology and reshaping entire industries. From the moment we wake up to our AI-powered alarm clocks to the personalized recommendations we receive throughout the day, machine learning algorithms are quietly working behind the scenes to enhance our digital experiences.</p>
    <h2>The Current State of AI Integration</h2>
    <p>Today's AI applications are more sophisticated and accessible than ever before. Smart home devices can learn our preferences and adjust lighting, temperature, and security settings automatically. Virtual assistants have become conversational partners that can help with everything from setting reminders to controlling our entire smart home ecosystem.</p>
    <blockquote>
      "The best AI is invisible AI - technology that seamlessly integrates into our lives without requiring us to change our behavior or learn new interfaces." - Dr. Sarah Chen, AI Research Director
    </blockquote>
    <h2>Emerging Trends and Applications</h2>
    <p>Looking ahead, several key trends are shaping the future of AI in consumer technology:</p>
    <ul>
      <li><strong>Predictive Health Monitoring:</strong> Wearable devices that can detect health issues before symptoms appear</li>
      <li><strong>Autonomous Transportation:</strong> Self-driving cars and smart traffic management systems</li>
      <li><strong>Personalized Education:</strong> AI tutors that adapt to individual learning styles and pace</li>
      <li><strong>Creative AI:</strong> Tools that assist in content creation, design, and artistic expression</li>
    </ul>
    <h2>Challenges and Considerations</h2>
    <p>While the potential benefits of AI are enormous, we must also address important challenges including privacy concerns, algorithmic bias, and the need for transparent AI decision-making processes. As AI becomes more prevalent, ensuring these systems are ethical, fair, and accountable becomes increasingly critical.</p>
    <p>The future of AI in everyday technology is not just about more powerful algorithms or faster processing - it's about creating technology that truly understands and serves human needs while respecting our values and privacy.</p>
  `,
}

const posts = [
  samplePost,
  {
    title: "How to Build a Smart Home on a Budget",
    excerpt: "Transform your living space with these affordable smart home solutions.",
    category: "Technology",
    image: "/blog/blog-recent-1.jpg",
    author: {
      name: "David Chen",
      avatar: "/blog/comments-2.jpg",
    },
    date: new Date("2023-05-20"),
    readTime: "7 min read",
    comments: 12,
    views: 1543,
    authorId: new mongoose.Types.ObjectId(users[0].id),
    status: "published",
    slug: "how-to-build-a-smart-home-on-a-budget",
    tags: ["Smart Home", "Technology", "Budget"],
    content: `
      <p>Smart home technology is now more affordable than ever. In this guide, we'll show you how to transform your living space with budget-friendly devices and automation tips.</p>
      <ul>
        <li>Choose compatible devices for seamless integration</li>
        <li>Automate lighting and climate control</li>
        <li>Enhance security with smart cameras and sensors</li>
      </ul>
      <p>Start small and expand your smart home as your needs grow!</p>
    `,
  },
  {
    title: "Sustainable Fashion: Eco-Friendly Brands to Support",
    excerpt: "These fashion brands are leading the way in environmental responsibility.",
    category: "Fashion",
    image: "/blog/blog-recent-3.jpg",
    author: {
      name: "Sophia Martinez",
      avatar: "/blog/comments-1.jpg",
    },
    date: new Date("2023-05-18"),
    readTime: "5 min read",
    comments: 8,
    views: 982,
    authorId: new mongoose.Types.ObjectId(users[1].id),
    status: "published",
    slug: "sustainable-fashion-eco-friendly-brands-to-support",
    tags: ["Fashion", "Sustainability", "Eco-Friendly"],
    content: `
      <p>Discover the top eco-friendly fashion brands making a difference for the planet. These companies use sustainable materials and ethical production methods.</p>
      <ul>
        <li>Brand A: Organic cotton and recycled fabrics</li>
        <li>Brand B: Fair trade certified</li>
        <li>Brand C: Zero-waste packaging</li>
      </ul>
      <p>Support these brands for a greener wardrobe!</p>
    `,
  },
  {
    title: "Digital Nomad Essentials: Work From Anywhere",
    excerpt: "The tools and tips you need to successfully work while traveling the world.",
    category: "Travel",
    image: "/blog/blog-recent-2.jpg",
    author: {
      name: "James Wilson",
      avatar: "/blog/comments-5.jpg",
    },
    date: new Date("2023-05-15"),
    readTime: "8 min read",
    comments: 15,
    views: 2134,
    authorId: new mongoose.Types.ObjectId(users[0].id),
    status: "published",
    slug: "digital-nomad-essentials-work-from-anywhere",
    tags: ["Travel", "Remote Work", "Digital Nomad"],
    content: `
      <p>Being a digital nomad is easier with the right gear and mindset. Here are the essentials for working from anywhere:</p>
      <ul>
        <li>Reliable laptop and portable Wi-Fi</li>
        <li>Cloud storage for easy access to files</li>
        <li>Time zone management tools</li>
      </ul>
      <p>Stay productive and enjoy your travels!</p>
    `,
  },
  {
    title: "The Rise of Foldable Smartphones",
    excerpt: "Are foldable phones the future? We examine the pros and cons of this emerging technology.",
    category: "Technology",
    image: "/blog/blog-recent-4.jpg",
    author: {
      name: "Lisa Park",
      avatar: "/blog/comments-3.jpg",
    },
    date: new Date("2023-05-12"),
    readTime: "6 min read",
    comments: 23,
    views: 3201,
    authorId: new mongoose.Types.ObjectId(users[1].id),
    status: "published",
    slug: "the-rise-of-foldable-smartphones",
    tags: ["Smartphones", "Technology", "Innovation"],
    content: `
      <p>Foldable smartphones are changing the way we use mobile devices. Explore the benefits and drawbacks of this new tech trend.</p>
      <ul>
        <li>Increased screen real estate</li>
        <li>Portability and versatility</li>
        <li>Durability concerns</li>
      </ul>
      <p>Will foldables become the new standard?</p>
    `,
  },
  {
    title: "Minimalist Wardrobe: Less is More",
    excerpt: "How to build a versatile wardrobe with fewer, high-quality pieces.",
    category: "Fashion",
    image: "/blog/blog-recent-5.jpg",
    author: {
      name: "Robert Brown",
      avatar: "/blog/comments-6.jpg",
    },
    date: new Date("2023-05-10"),
    readTime: "4 min read",
    comments: 7,
    views: 1245,
    authorId: new mongoose.Types.ObjectId(users[0].id),
    status: "published",
    slug: "minimalist-wardrobe-less-is-more",
    tags: ["Fashion", "Minimalism", "Lifestyle"],
    content: `
      <p>Embrace minimalism with a wardrobe that focuses on quality over quantity. Learn how to choose versatile pieces that work for any occasion.</p>
      <ul>
        <li>Invest in timeless basics</li>
        <li>Choose a neutral color palette</li>
        <li>Declutter regularly</li>
      </ul>
      <p>Less is truly more!</p>
    `,
  },
  {
    title: "Budget Travel Tips for Europe",
    excerpt: "See the best of Europe without breaking the bank with these insider tips.",
    category: "Travel",
    image: "/blog/blog-recent-5.jpg",
    author: {
      name: "Anna Schmidt",
      avatar: "/blog/comments-4.jpg",
    },
    date: new Date("2023-05-08"),
    readTime: "9 min read",
    comments: 19,
    views: 2876,
    authorId: new mongoose.Types.ObjectId(users[1].id),
    status: "published",
    slug: "budget-travel-tips-for-europe",
    tags: ["Travel", "Europe", "Budget"],
    content: `
      <p>Traveling Europe doesn't have to be expensive. Here are some tips to help you save money while exploring the continent:</p>
      <ul>
        <li>Travel off-season for lower prices</li>
        <li>Use budget airlines and trains</li>
        <li>Stay in hostels or guesthouses</li>
      </ul>
      <p>Enjoy Europe on a budget!</p>
    `,
  },
]

export default async function SeedPosts() {
  let status = "idle"
  let error = null

  try {
    await connectToDB()
    status = "loading"

    // Clear existing posts
    await BlogPost.deleteMany({})

    // Seed new posts
    await BlogPost.insertMany(posts)
    status = "done"
    await mongoose.disconnect()
  } catch (err) {
    error = err.message || "Unknown error"
    status = "error"
  }

  return (
    <div>
      <h1>Seed Database</h1>
      {status === "done" && (
        <p style={{ color: "green" }}>
          Seeding complete!
          <br />
          Blog posts have been seeded.
        </p>
      )}
      {status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}
      {status === "idle" && <p>Ready to seed.</p>}
      {status === "loading" && <p>Seeding in progress...</p>}
    </div>
  )
}