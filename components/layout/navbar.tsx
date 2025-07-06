import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/auth/user-nav"
import { createClient } from "@/lib/supabase/server"
import { PenTool } from "lucide-react"
import Image from "next/image"

export async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
              <div className="relative">
                <Image
                  src="/images/lakambini-logo.png"
                  alt="Lakambini XI Logo"
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-brand-200 group-hover:ring-brand-300 transition-all duration-300"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-brand-700 font-bold text-lg leading-tight">Lakambini XI</span>
                <span className="text-accent-600 text-xs font-medium">Archives</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hover:bg-brand-50 hover:text-brand-700 transition-all duration-300"
                >
                  <Link href="/write" className="flex items-center gap-2">
                    <PenTool className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Write</span>
                  </Link>
                </Button>
                <UserNav user={user} />
              </>
            ) : (
              <Button asChild className="professional-button">
                <Link href="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
