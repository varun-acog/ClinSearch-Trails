"use client"

import { useState, useEffect, useMemo } from "react"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import {
  Settings2,
  ExternalLink,
  Calendar,
  Building2,
  FlaskRoundIcon as Flask,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { ColumnManager } from "./ColumnManager"
import { StatusBadge, PhaseBadge, SexBadge, AgeGroupBadge } from "./ui/badges"
import { FiltersSection } from "./FiltersSection"
import { format } from "date-fns"
import { cn, highlightText } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Trial {
  nctId: string
  briefTitle: string
  overallStatus: string
  interventionName: string
  sponsorName: string
  phase?: string
  startDate?: string
  completionDate?: string
  enrollment?: number
  sex?: string
  ageGroup?: string
  stdAges?: string[]
  studyType?: string
}

interface Column {
  id: string
  title: string
  isVisible: boolean
  isLocked?: boolean
  group?: string
  accessor: (trial: Trial, searchQuery: string[], intervention: string) => React.ReactNode
}

const columnGroups = [
  { id: "basic", name: "Basic Information" },
  { id: "dates", name: "Timeline" },
  { id: "details", name: "Study Details" },
]

interface ClinicalTrialsTableProps {
  initialSearchQuery: string[]
  initialIntervention: string
}

export function ClinicalTrialsTable({ initialSearchQuery, initialIntervention }: ClinicalTrialsTableProps) {
  const [trials, setTrials] = useState<Trial[]>([])
  const [isColumnManagerOpen, setIsColumnManagerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [studiesPerPage, setStudiesPerPage] = useState(10)
  const [totalStudies, setTotalStudies] = useState(0)
  const [searchQuery, setSearchQuery] = useState<string[]>(initialSearchQuery)
  const [intervention, setIntervention] = useState<string>(initialIntervention)
  const [selectedPhase, setSelectedPhase] = useState("")
  const [isTableView, setIsTableView] = useState(true)
  const [selectedSex, setSelectedSex] = useState("")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("")
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [prevPageTokens, setPrevPageTokens] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedStudyTypes, setSelectedStudyTypes] = useState<string[]>([])
  const [tableSearchQuery, setTableSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsTableView(!isMobile)
  }, [isMobile])

  useEffect(() => {
    setSearchQuery(initialSearchQuery)
    setIntervention(initialIntervention)
    setCurrentPage(1)
    setPrevPageTokens([])
    fetchTrials(
      initialSearchQuery,
      initialIntervention,
      studiesPerPage,
      selectedPhase,
      selectedSex,
      selectedAgeGroup,
      null,
      selectedStatuses,
      selectedStudyTypes,
    )
  }, [initialSearchQuery, initialIntervention])

  const [columns, setColumns] = useState<Column[]>([
    {
      id: "briefTitle",
      title: "Study Title",
      isVisible: true,
      isLocked: true,
      group: "basic",
      accessor: (trial, searchQuery, intervention) => (
        <a
          href={`https://clinicaltrials.gov/study/${trial.nctId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {highlightText(trial.briefTitle, [...searchQuery, intervention].join(" "))}
        </a>
      ),
    },
    {
      id: "nctId",
      title: "NCT ID",
      isVisible: true,
      group: "basic",
      accessor: (trial) => <div className="font-mono text-sm">{trial.nctId}</div>,
    },
    {
      id: "status",
      title: "Status",
      isVisible: true,
      group: "basic",
      accessor: (trial) => <StatusBadge status={trial.overallStatus} />,
    },
    {
      id: "phase",
      title: "Phase",
      isVisible: true,
      group: "basic",
      accessor: (trial) => (trial.phase ? <PhaseBadge phase={trial.phase} /> : "N/A"),
    },
    {
      id: "startDate",
      title: "Start Date",
      isVisible: false,
      group: "dates",
      accessor: (trial) =>
        trial.startDate ? (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {format(new Date(trial.startDate), "MMM d, yyyy")}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      id: "completionDate",
      title: "Completion Date",
      isVisible: false,
      group: "dates",
      accessor: (trial) =>
        trial.completionDate ? (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {format(new Date(trial.completionDate), "MMM d, yyyy")}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      id: "enrollment",
      title: "Enrollment",
      isVisible: false,
      group: "details",
      accessor: (trial) =>
        trial.enrollment ? <div className="font-mono truncate">{trial.enrollment.toLocaleString()}</div> : "N/A",
    },
    {
      id: "intervention",
      title: "Intervention",
      isVisible: true,
      group: "details",
      accessor: (trial, searchQuery, intervention) => (
        <div className="flex items-center gap-2">
          <Flask className="h-4 w-4 text-muted-foreground" />
          {highlightText(trial.interventionName, [...searchQuery, intervention].join(" "))}
        </div>
      ),
    },
    {
      id: "sponsor",
      title: "Sponsor",
      isVisible: true,
      group: "details",
      accessor: (trial, searchQuery, intervention) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          {highlightText(trial.sponsorName, [...searchQuery, intervention].join(" "))}
        </div>
      ),
    },
    {
      id: "sex",
      title: "Sex",
      isVisible: true,
      group: "details",
      accessor: (trial) => <SexBadge sex={trial.sex} />,
    },
    {
      id: "stdAges",
      title: "Age Group",
      isVisible: false,
      group: "details",
      accessor: (trial) =>
        trial.stdAges ? (
          <div className="flex flex-wrap gap-1">
            {trial.stdAges.map((age) => (
              <AgeGroupBadge key={age} ageGroup={age} />
            ))}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      id: "studyType",
      title: "Study Type",
      isVisible: false,
      group: "details",
      accessor: (trial) => trial.studyType || "N/A",
    },
  ])

  const visibleColumns = columns.filter((col) => col.isVisible)

  const tableColumns = useMemo<ColumnDef<Trial>[]>(
    () =>
      visibleColumns.map((col) => ({
        accessorKey: col.id,
        header: col.title,
        cell: ({ row }) => col.accessor(row.original, searchQuery, intervention),
        size: col.id === "briefTitle" ? 400 : 150,
      })),
    [visibleColumns, searchQuery, intervention],
  )

  const filteredTrials = useMemo(() => {
    return trials.filter((trial) =>
      Object.values(trial).some((value) => String(value).toLowerCase().includes(tableSearchQuery.toLowerCase())),
    )
  }, [trials, tableSearchQuery])

  const table = useReactTable({
    data: filteredTrials,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const fetchTrials = async (
    diseaseNames: string[],
    intervention: string,
    pageSize: number,
    phase: string,
    sex: string,
    ageGroup: string,
    pageToken: string | null,
    selectedStatuses: string[],
    selectedStudyTypes: string[],
  ) => {
    setIsLoading(true)
    setError(null)
    try {
      let url = `/api/clinical-trials?format=json&pageSize=${pageSize}&countTotal=true`

      const queryParams = []
      if (diseaseNames.length > 0) {
        queryParams.push(`query.cond=${encodeURIComponent(diseaseNames.join(" OR "))}`)
      }
      if (intervention) {
        queryParams.push(`query.intr=${encodeURIComponent(intervention)}`)
      }

      const aggFilters = []
      if (phase) {
        aggFilters.push(`phase:${phase.replace("phase-", "")}`)
      }
      if (sex) {
        aggFilters.push(`sex:${sex}`)
      }
      if (ageGroup) {
        aggFilters.push(`ages:${ageGroup}`)
      }
      if (selectedStatuses.length > 0) {
        aggFilters.push(`status:${selectedStatuses.join(",")}`)
      }
      if (selectedStudyTypes.length > 0) {
        aggFilters.push(`studyType:${selectedStudyTypes.join(" ")}`)
      }

      if (queryParams.length > 0) {
        url += `&${queryParams.join("&")}`
      }
      if (aggFilters.length > 0) {
        const formattedAggFilters = aggFilters
          .map((filter) => {
            const [key, value] = filter.split(":")
            if (key === "status") {
              return `${key}:${value.split(",").join("%20")}`
            }
            return filter
          })
          .join(",")
        url += `&aggFilters=${encodeURIComponent(formattedAggFilters)}`
      }

      if (pageToken) {
        url += `&pageToken=${encodeURIComponent(pageToken)}`
      }

      console.log("Fetching data from:", url)

      let response = await fetch(url)

      // If the server-side API fails, fallback to direct API call
      if (!response.ok) {
        console.warn("Server-side API failed, falling back to direct API call")
        const directUrl = `https://clinicaltrials.gov/api/v2/studies?${url.split("?")[1]}`
        response = await fetch(directUrl)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Received data:", data)

      if (!data.studies || !Array.isArray(data.studies)) {
        throw new Error("Invalid data structure received from API")
      }

      const formattedTrials = data.studies.map((study: any) => ({
        nctId: study.protocolSection.identificationModule.nctId,
        briefTitle: study.protocolSection.identificationModule.briefTitle,
        overallStatus: study.protocolSection.statusModule.overallStatus,
        phase: study.protocolSection.designModule?.phases?.[0] || null,
        startDate: study.protocolSection.statusModule?.startDateStruct?.date,
        completionDate: study.protocolSection.statusModule?.completionDateStruct?.date,
        enrollment: study.protocolSection.designModule?.enrollmentInfo?.count,
        interventionName: study.protocolSection.armsInterventionsModule?.interventions?.[0]?.name || "N/A",
        sponsorName: study.protocolSection.sponsorCollaboratorsModule.leadSponsor.name,
        sex: study.protocolSection.eligibilityModule?.sex || "All",
        ageGroup: study.protocolSection.eligibilityModule?.stdAges?.[0] || "All",
        stdAges: study.protocolSection.eligibilityModule?.stdAges,
        studyType: study.protocolSection.designModule?.studyType,
      }))
      setTrials(formattedTrials)
      setTotalStudies(data.totalCount)
      setNextPageToken(data.nextPageToken || null)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError(
        `An error occurred while fetching the data: ${err instanceof Error ? err.message : String(err)}. Please try again.`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhaseChange = (phase: string) => {
    setSelectedPhase(phase === "all" ? "" : phase)
    fetchTrials(
      searchQuery,
      intervention,
      studiesPerPage,
      phase === "all" ? "" : phase,
      selectedSex,
      selectedAgeGroup,
      null,
      selectedStatuses,
      selectedStudyTypes,
    )
  }

  const handleSexChange = (sex: string) => {
    setSelectedSex(sex === "all" ? "" : sex)
    fetchTrials(
      searchQuery,
      intervention,
      studiesPerPage,
      selectedPhase,
      sex === "all" ? "" : sex,
      selectedAgeGroup,
      null,
      selectedStatuses,
      selectedStudyTypes,
    )
  }

  const handleAgeGroupChange = (ageGroup: string) => {
    setSelectedAgeGroup(ageGroup === "all" ? "" : ageGroup)
    fetchTrials(
      searchQuery,
      intervention,
      studiesPerPage,
      selectedPhase,
      selectedSex,
      ageGroup === "all" ? "" : ageGroup,
      null,
      selectedStatuses,
      selectedStudyTypes,
    )
  }

  const handleStatusChange = (statuses: string[]) => {
    setSelectedStatuses(statuses)
    fetchTrials(
      searchQuery,
      intervention,
      studiesPerPage,
      selectedPhase,
      selectedSex,
      selectedAgeGroup,
      null,
      statuses,
      selectedStudyTypes,
    )
  }

  const handleStudiesPerPageChange = (newStudiesPerPage: number) => {
    setStudiesPerPage(newStudiesPerPage)
    setCurrentPage(1)
    setPrevPageTokens([])
    fetchTrials(
      searchQuery,
      intervention,
      newStudiesPerPage,
      selectedPhase,
      selectedSex,
      selectedAgeGroup,
      null,
      selectedStatuses,
      selectedStudyTypes,
    )
  }

  const handleColumnChange = (newColumns: Column[]) => {
    setColumns(newColumns)
  }

  const handleCloseColumnManager = () => {
    setIsColumnManagerOpen(false)
  }

  const handleNextPage = () => {
    if (nextPageToken) {
      setPrevPageTokens((prev) => [...prev, nextPageToken])
      setCurrentPage((prev) => prev + 1)
      fetchTrials(
        searchQuery,
        intervention,
        studiesPerPage,
        selectedPhase,
        selectedSex,
        selectedAgeGroup,
        nextPageToken,
        selectedStatuses,
        selectedStudyTypes,
      )
    }
  }

  const handlePreviousPage = () => {
    if (prevPageTokens.length > 0) {
      const newPrevTokens = [...prevPageTokens]
      const prevToken = newPrevTokens.pop()
      setPrevPageTokens(newPrevTokens)
      setCurrentPage((prev) => prev - 1)
      fetchTrials(
        searchQuery,
        intervention,
        studiesPerPage,
        selectedPhase,
        selectedSex,
        selectedAgeGroup,
        prevToken || null,
        selectedStatuses,
        selectedStudyTypes,
      )
    }
  }

  const handleResetFilters = () => {
    setSelectedPhase("")
    setSelectedSex("")
    setSelectedAgeGroup("")
    setSelectedStatuses([])
    setSelectedStudyTypes([])
    fetchTrials(searchQuery, intervention, studiesPerPage, "", "", "", null, [], [])
  }

  const handleStudyTypeChange = (types: string[]) => {
    setSelectedStudyTypes(types)
    fetchTrials(
      searchQuery,
      intervention,
      studiesPerPage,
      selectedPhase,
      selectedSex,
      selectedAgeGroup,
      null,
      selectedStatuses,
      types,
    )
  }

  const handleTableSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableSearchQuery(event.target.value)
  }

  const SkeletonLoader = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md text-center font-medium text-base">
        ⚠️ The ClinSearch does not review or approve the safety and science of all studies listed on this website.
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Current Search:</h2>
        <div className="flex flex-wrap gap-2">
          {searchQuery.map((disease) => (
            <Badge key={disease} variant="secondary">
              {disease}
            </Badge>
          ))}
          {intervention && <Badge variant="secondary">Intervention: {intervention}</Badge>}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <FiltersSection
          selectedPhase={selectedPhase}
          onPhaseChange={handlePhaseChange}
          selectedSex={selectedSex}
          onSexChange={handleSexChange}
          selectedAgeGroup={selectedAgeGroup}
          onAgeGroupChange={handleAgeGroupChange}
          selectedStatuses={selectedStatuses}
          onStatusChange={handleStatusChange}
          selectedStudyTypes={selectedStudyTypes}
          onStudyTypeChange={handleStudyTypeChange}
          onResetPhase={() => setSelectedPhase("")}
          onResetSex={() => setSelectedSex("")}
          onResetAgeGroup={() => setSelectedAgeGroup("")}
          onResetStatus={() => setSelectedStatuses([])}
          onResetStudyType={() => setSelectedStudyTypes([])}
        />
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <Input
              type="search"
              placeholder="Search in table..."
              value={tableSearchQuery}
              onChange={handleTableSearch}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Studies per page:</span>
            <Select
              value={studiesPerPage.toString()}
              onValueChange={(value) => handleStudiesPerPageChange(Number(value))}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Table</span>
            <Switch checked={!isTableView} onCheckedChange={() => setIsTableView(!isTableView)} />
            <span className="text-sm font-medium">Cards</span>
          </div>
          {isTableView && (
            <Button variant="outline" onClick={() => setIsColumnManagerOpen(true)} className="gap-2">
              <Settings2 className="h-4 w-4" />
              Manage Columns
            </Button>
          )}
        </div>
      </div>

      {totalStudies !== undefined && (
        <div className="text-center text-sm text-muted-foreground mb-4">
          Total Studies: {totalStudies.toLocaleString()}
        </div>
      )}

      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-red-100 rounded-md">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
          <p className="text-sm mt-2">Please check the console for more details.</p>
        </div>
      ) : (
        <>
          {isTableView ? (
            <div className="isolate overflow-x-auto border rounded-lg max-w-[calc(100vw-2rem)]">
              <Table className="min-w-full text-left text-sm font-light border-collapse relative">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => (
                        <TableHead
                          key={header.id}
                          className={cn(
                            "font-bold text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800",
                            "font-sans tracking-wide text-sm",
                            index === 0
                              ? "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] bg-gray-100 dark:bg-gray-800"
                              : "",
                          )}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell, index) => (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              "border-2 border-gray-200 dark:border-gray-700 font-sans text-sm leading-relaxed",
                              index === 0
                                ? "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-900 max-w-[400px]"
                                : "whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]",
                            )}
                            style={{ padding: index === 0 ? "1rem" : undefined }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trials.map((trial) => (
                <Card
                  key={trial.nctId}
                  className="w-full hover:shadow-lg transition-shadow bg-gradient-to-br from-sky-50 to-white dark:from-sky-900 dark:to-gray-900"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <a
                        href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {trial.briefTitle}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2 font-sans text-sm leading-relaxed">
                      <div className="flex justify-between">
                        <span className="font-semibold">NCT ID:</span>
                        <span className="font-mono">{trial.nctId}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Phase:</span>
                        {trial.phase ? <PhaseBadge phase={trial.phase} /> : "N/A"}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Status:</span>
                        <StatusBadge status={trial.overallStatus} />
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Intervention:</span>
                        <span className="text-right">{trial.interventionName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Sponsor:</span>
                        <span className="text-right">{trial.sponsorName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Sex:</span>
                        {trial.sex ? <SexBadge sex={trial.sex} /> : "N/A"}
                      </div>
                      <div>
                        <span className="font-semibold">Age Group:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {trial.stdAges
                            ? trial.stdAges.map((age) => <AgeGroupBadge key={age} ageGroup={age} />)
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">Page {currentPage}</div>
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={!nextPageToken}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {!isLoading && !error && trials.length === 0 && (
        <div className="text-center">No trials found. Please try a different search term.</div>
      )}

      <ColumnManager
        columns={columns}
        columnGroups={columnGroups}
        onColumnsChange={handleColumnChange}
        open={isColumnManagerOpen}
        onClose={handleCloseColumnManager}
      />
    </div>
  )
}

