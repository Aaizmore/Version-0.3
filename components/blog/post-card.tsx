import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, ImageIcon } from "lucide-react"
import type { Post } from "@/lib/types"
import Image from "next/image"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const authorName = post.profiles?.full_name || post.profiles?.email || "Anonymous"
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group professional-card">
      {post.featured_image && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.featured_image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8 ring-2 ring-brand-200">
            <AvatarImage
              src={post.profiles?.avatar_url || "/placeholder.svg"}
              alt={authorName}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-brand-100 to-accent-100 text-brand-700 text-xs font-semibold">
              {authorInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="truncate font-medium text-brand-700">{authorName}</span>
              <span className="text-gray-300">•</span>
              <Calendar className="h-3 w-3 text-gray-400" />
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
        </div>

        <Link href={`/post/${post.slug}`}>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-brand-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {post.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        {post.excerpt && (
          <p className="text-gray-600 line-clamp-3 mb-4 text-sm sm:text-base leading-relaxed">{post.excerpt}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/post/${post.slug}`}>
              <Badge
                variant="outline"
                className="border-brand-200 text-brand-600 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all duration-300"
              >
                Read More
              </Badge>
            </Link>
            {post.images && post.images.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <ImageIcon className="h-3 w-3" />
                <span>{post.images.length}</span>
              </div>
            )}
          </div>
          {!post.published && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-gray-200">
              Draft
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
