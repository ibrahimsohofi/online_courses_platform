"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

type User = {
  name: string;
  email: string;
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle scrolling - add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    // If on a protected page, redirect to home
    if (pathname.startsWith("/dashboard")) {
      window.location.href = "/";
    }
  };

  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Only show navigation options once we've confirmed client-side mounting
  // This prevents hydration errors with localStorage
  if (!mounted) {
    return (
      <header className={`sticky top-0 z-50 w-full border-b bg-background ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">LearnOnline</Link>
          </div>
          <div className="w-10 h-10"></div> {/* Placeholder for user icon */}
        </div>
      </header>
    );
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">LearnOnline</Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/courses"
              className={`text-sm font-medium hover:text-primary ${pathname === '/courses' ? 'text-primary' : ''}`}
            >
              Courses
            </Link>
            <Link
              href="/categories"
              className={`text-sm font-medium hover:text-primary ${pathname === '/categories' ? 'text-primary' : ''}`}
            >
              Categories
            </Link>
            <Link
              href="/instructors"
              className={`text-sm font-medium hover:text-primary ${pathname === '/instructors' ? 'text-primary' : ''}`}
            >
              Instructors
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-10"
            />
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 py-4">
                <Link href="/" className="font-bold text-xl">LearnOnline</Link>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="pl-10 w-full"
                  />
                </div>
                <nav className="flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link
                      href="/courses"
                      className="text-sm font-medium py-2 hover:text-primary"
                    >
                      Courses
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/categories"
                      className="text-sm font-medium py-2 hover:text-primary"
                    >
                      Categories
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/instructors"
                      className="text-sm font-medium py-2 hover:text-primary"
                    >
                      Instructors
                    </Link>
                  </SheetClose>
                  {user ? (
                    <>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard"
                          className="text-sm font-medium py-2 hover:text-primary"
                        >
                          Dashboard
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard/my-courses"
                          className="text-sm font-medium py-2 hover:text-primary"
                        >
                          My Courses
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <button
                          onClick={handleSignOut}
                          className="text-sm font-medium py-2 text-left text-red-500 hover:text-red-600"
                        >
                          Sign Out
                        </button>
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Link
                          href="/login"
                          className="text-sm font-medium py-2 hover:text-primary"
                        >
                          Sign In
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/register"
                          className="text-sm font-medium py-2 hover:text-primary"
                        >
                          Sign Up
                        </Link>
                      </SheetClose>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {/* Authentication Section */}
          {!isAuthPage && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-muted">
                    <span className="font-medium text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/my-courses" className="w-full cursor-pointer">My Courses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="w-full cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  )
}
