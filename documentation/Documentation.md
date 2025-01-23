# Clinical Trials Documentation

## Project Overview
The goal of this project is to create a web-based interface for querying and displaying clinical trial data retrieved from the ClinicalTrials.gov API. The application will support search and filtering functionalities to allow users to customize their results and meet their specific needs. The interface will be user-friendly, responsive, and equipped with features like pagination and data export.

## Objectives

- **Data Retrieval**: Fetch clinical trials based on user-entered search terms.
- **Filtering**: Enable filtering by study title, NCT ID, status, intervention, sponsor, year range, and other parameters.
- **User Interface**: Display results in a responsive, tabular format or card format with sorting, pagination, and export options.
- **Extensibility**: Provide a developer-friendly architecture for adding features or integrating new APIs.

## Target Users

- **Researchers**: Discover studies relevant to their research fields.
- **Medical Professionals**: Gain insights into ongoing or completed clinical trials.
- **Patients or Caregivers**: Explore trials relevant to their conditions.
- **Regulatory Bodies**: Monitor clinical trial progress and compliance.

---

## Development Plan

### Breakdown of the Problem

#### **Data Retrieval**:
- Connect to the ClinicalTrials.gov API.
- Fetch data using disease or condition as a query parameter.

#### **Filter Implementation**:
- Allow filtering by:
  - **Study Title**: Match keywords in trial titles.
  - **Age**: Search by various age groups.
  - **Status**: Filter by trial status (e.g., "Recruiting," "Completed").
  - **Intervention**: Search by intervention type.
  - **Phase**: Filter by various phases.
  - **Sex**: Filter by genders.
  - **Study Type**: Filter based on study types.
  

#### **User Interface Design**:
- Created a landing page with search component and search by 6 popular diseases.
- Toggle theme between light mode and dark mode.
- Create a responsive table with columns for study title, NCT ID, status, intervention, sponsor, and study dates.
- Include sorting and pagination.


#### **Search Optimization**:
- Support synonyms and related terms for broader and more accurate search results.

### Development Steps

#### **Version 0: Basic Data Fetching**
- **Feature**: Retrieve and display clinical trial data for a hardcoded disease.
- **Goal**: Verify API integration.

#### **Version 1: Basic Search and Display**
- **Feature**: Add user input for dynamic disease search.
- **UI**: Display results in a simple, styled table.

#### **Version 2: Filter Implementation**
- **Feature**: Introduce filtering for study title, status, sponsor, interventions, and year range.
- **UI**: Refine the table to accommodate filtering options.

#### **Version 3: Finalization**
- **Features**: Add pagination, sorting, and export functionality.
- **UI**: Enhance responsiveness and aesthetics.
- **Testing**: Conduct functional and usability tests.

---

## Project Guide

### Prerequisites

#### **Environment**:
- Node.js (>=16.0.0) for React or Next.js development.
- Access to the ClinicalTrials.gov API (no authentication required for public endpoints).
- Git for version control.

#### **Libraries**:
- Fetch API for HTTP requests.
- Tan-stack Table for rendering tabular data.

### Component Structure

#### **Core Components**

1. **SearchBar**:
   - **Purpose**: Accept user input for disease or condition.
   - **Usage**: Developers can extend this to include auto-suggestions or advanced search options.

2. **FilterPanel**:
   - **Purpose**: Provide filtering options for results.
   - **Usage**: Add new filter types by updating state and API query logic.

3. **DataTable**:
   - **Purpose**: Display search results in a sortable, paginated table.
   - **Usage**: Customize columns by modifying the column definition array.

4. **ToggleButton**:
   - **Purpose**: Toggle between table view and card view.
   - **Usage**: Customize the view of diseases as tables or cards.

### Extensibility

- **Adding Filters**:
  - Update the state and API query builder in the FilterPanel.
  - Modify backend or API query parameters if required.
- **Custom Styling**:
  - Use a CSS-in-JS solution (e.g., styled-components) or global stylesheets.
- **Framework Compatibility**:
  - Use React or Next.js for server-side rendering and SEO.

### API Integration

- **Endpoint**: `https://clinicaltrials.gov/api/v2/studies?query.cond=%3C%3Cdisease_name%3E%3E&countTotal=true`
- **Query Parameters**:
  - **condition**: Disease or condition to search.
  - **status**: Recruiting, Completed, etc.
  - **year**: Start and end years.
  - **intervention**: Type of intervention (e.g., drug, device).
  - **sponsor**: Trial sponsor.

---

## Deployment Guide

### Build Commands
- For React: `npm run build`
- For Next.js: `npm run build` (includes server-side rendering).


---

## End User Documentation

### Search
- Enter a disease or condition in the search bar.
- Press "Search" to display results.

### Filter
- Select options from the filter panel to refine results.
- Apply multiple filters simultaneously.

### Pagination and Sorting
- Navigate between pages using the pagination controls.
- Sort results by clicking on column headers.

---

## Roles and Responsibilities
### Shifath:

* Integrated the ClinicalTrials.gov API.

* Developed the logic for applying filters (study title, NCT ID, status, interventions, sponsors, study type, phase, sex).

* Optimized API queries for performance.

* Developed the logic for managing columns.

* Designed the hero section for the landing page.

* Added search suggestions for conditions and interventions using ClinicalTrails API.

### Varun:

* Designed and implemented the UI using React and styled the components.

* Developed core components such as the SearchBar and ToggleButton.

* Created reusable components like SearchBar, FilterPanel, and DataTable.

* Managed component publishing and ensured responsiveness.

* Implemented data fetching from the ClinicalTrials.gov API and displayed it in a structured format.

* Implemented the search in table functionality.

---

## Exit Criteria

- Users can search for clinical trials by disease or condition.
- Filters (status, age, sex, phases, study type, interventions) work as intended.
- Results are displayed in a responsive, sortable, and paginated table.


---

## Feedback and Iteration

Your feedback will help refine and improve the project. Please review the proposed plan and provide insights or suggestions.
