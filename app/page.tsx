import { createClient } from "@/lib/supabase/server"
import { PostCard } from "@/components/blog/post-card"
import { Button } from "@/components/ui/button"
import { PenTool, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/types"

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      profiles (
        id,
        email,
        full_name,
        avatar_url
      )
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Image
                src="/images/lakambini-logo.png"
                alt="Lakambini XI Logo"
                width={120}
                height={120}
                className="rounded-full shadow-lg ring-4 ring-brand-200"
              />
              <div className="absolute -top-2 -right-2 bg-brand-500 text-white rounded-full p-2">
                <Award className="h-5 w-5" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8">
            <span className="text-gray-900">Grade XI</span>
            <br />
            <span className="professional-text">Lakambini Archives</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
            A professional platform for Grade XI Lakambini students to share academic insights, experiences, and stories
            that inspire our community.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <Users className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-gray-700">Student Community</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <BookOpen className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-gray-700">Academic Excellence</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <Award className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-gray-700">2025-2026</span>
            </div>
          </div>

          {user && (
            <Button asChild size="lg" className="professional-button">
              <Link href="/write" className="flex items-center gap-2">
                <PenTool className="h-5 w-5" />
                Share Your Story
              </Link>
            </Button>
          )}
        </div>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Latest Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover insights, experiences, and academic achievements from our Lakambini XI community.
              </p>
            </div>
            <div className="grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-brand-100 to-accent-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-brand-500" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">No stories yet</h3>

            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Be the first to share your academic journey and inspire your fellow Lakambini students.
            </p>

            {user ? (
              <Button asChild size="lg" className="professional-button">
                <Link href="/write" className="flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  Write First Story
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="professional-button">
                <Link href="/auth">Get Started</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
