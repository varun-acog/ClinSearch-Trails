"use client"

import { useState } from "react"
import { ClinicalTrialsTable } from "../components/ClinicalTrialsTable"
import { DiseaseSelector } from "../components/DiseaseSelector"
import { SearchBar } from "../components/SearchBar"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FileText, Activity, Globe } from "lucide-react"
import { QuickStatCard } from "../components/QuickStatCard"
import { FAQSection } from "../components/FAQSection"

export default function Home() {
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string[]>([])
  const [intervention, setIntervention] = useState<string>("")
  const [searchKey, setSearchKey] = useState(0)

  const handleSearch = (condition: string, interventionInput: string) => {
    const query = condition ? [condition] : []
    setSearchQuery(query)
    setIntervention(interventionInput)
    setSearchPerformed(true)
    setSearchKey((prevKey) => prevKey + 1)
  }

  const handleDiseaseSelect = (diseases: string[]) => {
    setSearchQuery(diseases)
    setIntervention("")
    setSearchPerformed(true)
    setSearchKey((prevKey) => prevKey + 1)
  }

  const handleResetSearch = () => {
    setSearchPerformed(false)
    setSearchQuery([])
    setIntervention("")
    setSearchKey((prevKey) => prevKey + 1)
  }

  return (
    <div
      className={`min-h-screen flex flex-col relative ${
        !searchPerformed
          ? "bg-gradient-to-br from-sky-100 to-white dark:from-gray-900 dark:to-gray-950"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      {!searchPerformed && <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true"></div>}
      <Header onLogoClick={handleResetSearch} />
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!searchPerformed ? (
            <>
              <h1 className="text-7xl font-extrabold text-center mb-6">
                <span className="text-black dark:text-white">Find the Right Clinical Trials,</span>{" "}
                <span className="text-gradient">Faster</span>
              </h1>
              <div className="max-w-3xl mx-auto space-y-16">
                <div className="w-full text-center space-y-4">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Search and filter through thousands of clinical trials with ease. Get real-time access to the latest
                    medical research opportunities.
                  </p>
                </div>

                <Card className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-800">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Quick Search</h2>
                    <SearchBar onSearch={handleSearch} />
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gradient text-center mb-6">Popular Conditions</h2>
                  <DiseaseSelector
                    onSearch={handleDiseaseSelect}
                    darkModeClasses="dark:hover:from-blue-800 dark:hover:to-purple-800 dark:text-white"
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gradient text-center mb-6">Quick Stats</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickStatCard icon={FileText} value="350,000+" label="Total Studies" />
                    <QuickStatCard icon={Activity} value="50,000+" label="Active Studies" />
                    <QuickStatCard icon={Globe} value="200+" label="Countries" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="w-full max-w-4xl mx-auto mb-12">
                <SearchBar onSearch={handleSearch} />
              </div>
              <ClinicalTrialsTable
                key={searchKey}
                initialSearchQuery={searchQuery}
                initialIntervention={intervention}
              />
            </div>
          )}
        </div>
      </main>
     
      <Footer />
    </div>
  )
}

