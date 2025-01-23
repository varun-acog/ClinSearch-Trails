# ClinSearch Developer's Guide

## Table of Contents
1. [Application Overview](#application-overview)
2. [System Architecture](#system-architecture)
3. [Key Components](#key-components)
4. [Data Flow and State Management](#data-flow-and-state-management)
5. [API Integration](#api-integration)
6. [Filtering and Pagination](#filtering-and-pagination)
7. [UI Components](#ui-components)
8. [Responsive Design and Accessibility](#responsive-design-and-accessibility)
9. [Performance Optimizations](#performance-optimizations)
10. [Extending the Application](#extending-the-application)

## 1. Application Overview

ClinSearch is a Next.js application designed to help users search and analyze clinical trials. It provides a user-friendly interface for searching trials based on conditions, interventions, and various filters. The application fetches data from the ClinicalTrials.gov API and presents it in an easily digestible format.

## 2. System Architecture

ClinSearch is built using the following technologies:

- Next.js 13 with App Router
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Tanstack Table

The application follows a client-side rendering approach for most components, with server-side API routes for data fetching.

## 3. Key Components

### 3.1 Page Components
- `app/page.tsx`: The main page component
- `app/about/page.tsx`: The about page
- `app/faq/page.tsx`: The FAQ page

### 3.2 Functional Components
- `ClinicalTrialsTable`: The core component for displaying and managing clinical trial data
- `SearchBar`: Handles user input for searching trials
- `FiltersSection`: Manages various filters for refining search results
- `DiseaseSelector`: Allows users to select from predefined diseases
- `ColumnManager`: Manages visible columns in the table view

### 3.3 UI Components
- `Header`: The application header with navigation
- `Footer`: The application footer
- `QuickStatCard`: Displays quick statistics
- Various shadcn/ui components (Button, Card, Dialog, etc.)

### 3.4 API Routes
- `app/api/clinical-trials/route.ts`: Handles requests to the ClinicalTrials.gov API
- `app/api/suggestions/route.ts`: Manages autocomplete suggestions for search inputs

## 4. Data Flow and State Management

The application primarily uses React's useState and useEffect hooks for state management. The main states are managed in the `ClinicalTrialsTable` component, including:

- `trials`: The current list of clinical trials
- `searchQuery` and `intervention`: The current search parameters
- `selectedPhase`, `selectedSex`, `selectedAgeGroup`, `selectedStatuses`, `selectedStudyTypes`: Various filter states
- `currentPage`, `studiesPerPage`, `totalStudies`: Pagination-related states

State is passed down to child components as props, and update functions are passed to allow child components to modify the state.

## 5. API Integration

### 5.1 ClinicalTrials.gov API
The application interacts with the ClinicalTrials.gov API through two server-side API routes:

1. `/api/clinical-trials`: Fetches clinical trial data
2. `/api/suggestions`: Retrieves autocomplete suggestions for conditions and interventions

These routes act as proxies to the ClinicalTrials.gov API, allowing us to handle CORS issues and add caching if needed.

### 5.2 Data Fetching
The `fetchTrials` function in `ClinicalTrialsTable` is responsible for constructing the API query based on the current state (search terms, filters, pagination) and fetching the data. It uses the native `fetch` API and handles the response, updating the component state accordingly.

## 6. Filtering and Pagination

### 6.1 Filtering
Filters are implemented using the `aggFilters` parameter in the API query. The `FiltersSection` component manages the UI for these filters, while the `ClinicalTrialsTable` component handles the logic for applying them.

### 6.2 Pagination
Pagination is implemented using the `pageSize` and `pageToken` parameters from the ClinicalTrials.gov API. The application maintains a `nextPageToken` for moving to the next page and a stack of `prevPageTokens` for navigating back.

## 7. UI Components

The application uses a combination of custom components and shadcn/ui components. Key custom components include:

- `StatusBadge`, `PhaseBadge`, `SexBadge`, `AgeGroupBadge`: Display trial information in a visually appealing way
- `ConditionSearch` and `InterventionSearch`: Provide autocomplete functionality for search inputs

shadcn/ui components are used extensively for consistent styling and behavior, including `Button`, `Card`, `Dialog`, `Select`, and more.

## 8. Responsive Design and Accessibility

### 8.1 Responsive Design
The application uses Tailwind CSS for responsive design. Key features include:

- Flexbox and Grid layouts with responsive classes
- Custom hooks like `useMediaQuery` for conditional rendering based on screen size
- Collapsible sidebar for filters on mobile devices

### 8.2 Accessibility
Accessibility features include:

- Proper heading structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader-friendly content structure

## 9. Performance Optimizations

- Code splitting through Next.js's automatic code splitting feature
- Memoization of expensive computations using `useMemo`
- Debouncing of API calls for autocomplete suggestions
- Efficient re-rendering through proper use of React hooks and state management

## 10. Extending the Application

To extend the application:

1. Add new components in the `components` directory
2. Create new pages in the `app` directory
3. Extend API functionality by adding new routes in the `app/api` directory
4. Add new filters by updating the `FiltersSection` component and the `fetchTrials` function
5. Extend the table functionality by modifying the `ClinicalTrialsTable` component

When adding new features, ensure they follow the existing patterns for state management, API integration, and UI consistency.

