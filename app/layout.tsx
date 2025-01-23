import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from 'next'
import "./globals.css"

export const metadata: Metadata = {
  title: "ClinSearch - Discover Clinical Trials",
  description: "ClinSearch helps you discover and analyze clinical trials from around the world.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

