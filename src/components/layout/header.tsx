"use client"

import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">LearnOnline</Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/courses" className="text-sm font-medium hover:underline">
              Courses
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:underline">
              Categories
            </Link>
            <Link href="/instructors" className="text-sm font-medium hover:underline">
              Instructors
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block relative w-64">
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/login" className="w-full">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/register" className="w-full">Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
