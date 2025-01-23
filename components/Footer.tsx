import Link from "next/link"
import { FAQSection } from "./FAQSection"

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About ClinSearch</h3>
            <p className="text-sm text-muted-foreground">
              ClinSearch helps you discover and analyze clinical trials from around the world. Our platform provides
              real-time access to the latest medical research opportunities, advanced filtering options, and a
              user-friendly interface to streamline your search for relevant clinical trials.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">FAQ</h3>
            <FAQSection />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 ClinSearch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

