import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">LearnOnline</h3>
          <p className="text-sm text-muted-foreground">
            Empowering learners through accessible and high-quality online education
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/courses" className="text-muted-foreground hover:text-foreground">
                All Courses
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/instructors" className="text-muted-foreground hover:text-foreground">
                Instructors
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LearnOnline. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
