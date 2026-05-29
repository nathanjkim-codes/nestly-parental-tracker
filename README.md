# Nestly

A frontend child growth tracking dashboard built with HTML, CSS, and JavaScript.

## Live Demo

Coming Soon

## Demo Video

Coming Soon

## Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.jpg)

### Child Profile

![Child Profile](screenshots/child-profile.jpg)

### Growth Chart

![Growth Chart](screenshots/growth-chart.jpg)

### Growth Records

![Growth Records](screenshots/growth-records.jpg)

Nestly allows parents to create child profiles, track growth history, visualize growth data, and persist application state using LocalStorage.

This project was designed not only as a CRUD application, but also as a frontend architecture and state management learning project.

While building Nestly, I focused on understanding:

- State-based UI rendering
- Data flow between state and UI
- LocalStorage persistence and restoration
- Event-driven architecture
- Chart lifecycle management
- Empty state handling
- Separation of concerns
- Reusable UI structures

Nestly helped me better understand how real frontend applications synchronize state, rendering, persistence, and user interaction.

---

# Features

- Add, edit, and delete child profiles
- Add and manage growth records
- Growth chart visualization using Chart.js
- LocalStorage persistence
- Restore selected child after refresh
- Empty state handling
- Modal-based add/edit workflow
- Dynamic DOM rendering
- Event delegation for child card selection

---

# Tech Stack

- HTML
- CSS
- JavaScript
- Chart.js
- LocalStorage

---

# Folder Structure

```text
Nestly/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── data.js
│   ├── ui.js
│   └── storage.js
├── assets/
│   └── logo.png
└── README.md
```

---

# File Responsibilities

| File       | Responsibility                   |
| ---------- | -------------------------------- |
| main.js    | Application logic and event flow |
| data.js    | Data creation and data structure |
| ui.js      | UI rendering and DOM creation    |
| storage.js | LocalStorage persistence         |

---

# Data Structure

Each child contains their own growth records.

```js
{
  id: 1711111111111,
  name: "Emma",
  birth: "2022-03-01",
  heightFt: 3,
  heightIn: 2,
  weight: 30,
  gender: "female",

  growthRecords: [
    {
      date: "05/01/2026",
      heightFt: 3,
      heightIn: 2,
      weight: 30
    },
    {
      date: "06/01/2026",
      heightFt: 3,
      heightIn: 3,
      weight: 32
    }
  ]
}
```

This structure helped me understand:

- One-to-many relationships
- Nested data structures
- Organizing related data together

---

# Core State Variables

## selectedChild

Acts as the main source of truth for:

- selected profile
- growth records
- growth chart

```js
let selectedChild = null;
```

---

## modalMode

Controls modal behavior.

```js
modalMode = "add" | "edit";
```

---

## currentInputs

Stores modal input references to avoid repeated DOM queries.

---

## growthChart

Stores the current Chart.js instance and safely destroys and recreates charts when data changes.

---

# Application Flow

## Add Child Flow

```text
User Input
↓
Validate Inputs
↓
Create Child Object
↓
Push Into children Array
↓
Save to LocalStorage
↓
Re-render UI
```

---

## Growth Record Flow

```text
Submit Form
↓
Create Record Object
↓
Push Into selectedChild.growthRecords
↓
Save Children Data
↓
Re-render Records
↓
Re-render Chart
```

---

## Restore State Flow

```text
Load children from LocalStorage
↓
Get selectedChildId
↓
Find matching child
↓
Restore selectedChild
↓
Render profile / records / chart
```

---

# Core Frontend Concepts Applied

## Single Source of Truth

`selectedChild` controls:

- profile rendering
- records rendering
- chart rendering

---

## State-Based UI

The UI changes based on:

- selected child state
- growth records state
- empty state conditions

---

## CRUD Architecture

Supports:

- Create
- Read
- Update
- Delete

operations for:

- child profiles
- growth records

---

## Event Delegation

A single parent event listener handles child card selection.

---

## LocalStorage Persistence

Uses:

```js
JSON.stringify();
JSON.parse();
```

to persist and restore application state.

---

## Chart Lifecycle Management

Previous chart instances are destroyed before rendering new charts.

This prevents overlapping charts and stale UI.

---

# Architecture Decisions

## Reusable Modal Structure

A single modal is reused for:

- Add Child
- Edit Child

using:

```js
modalMode = "add" | "edit";
```

This reduced duplicated UI and logic.

---

## Minimal Persisted Data

Instead of storing an entire child object in LocalStorage, only the selected child ID is persisted.

The application restores the full object using:

```js
children.find();
```

This keeps persisted data simple and reduces unnecessary storage.

---

## Full UI Re-render Strategy

Instead of manually updating individual DOM nodes, the application re-renders affected UI sections after state changes.

Benefits:

- Prevents duplicate UI
- Keeps UI synchronized with state
- Simplifies debugging
- Makes rendering behavior predictable

---

# Debugging Lessons

## Saving Selected Child ID Correctly

### Problem

I originally passed the entire child object into the selected child save function.

```js
saveSelectedChildId(child);
```

### Fix

```js
saveSelectedChildId(child.id);
```

### What I Learned

- Store only the minimal data needed
- Use persisted IDs to restore objects with `find()`
- Function arguments should match function responsibility
- Small mismatches can create logic bugs, not just syntax bugs

---

## Empty Message Not Showing

### Problem

The empty message only appeared after refreshing the page.

### Cause

```js
recordsContainer.innerHTML = "";
```

cleared the container and removed the empty message element from the DOM.

### Fix

```js
recordsContainer.appendChild(emptyMessage);
emptyMessage.style.display = "block";
```

### What I Learned

- Clearing a container removes child elements
- Rendering order matters
- Empty states should be handled intentionally

---

## Add Child Form Appearing Inside Dropdown

### Problem

The Add Child form appeared inside the child list dropdown.

### Cause

```js
childList.appendChild(inputWrapper);
```

The form and child cards shared the same container.

### Fix

The child list container became responsible only for rendering child cards, and the Add Child workflow was moved into the modal system.

### What I Learned

- UI containers need clear responsibilities
- Mixing responsibilities creates layout bugs
- Separation of concerns improves maintainability

---

# Git & Branch Lessons

This project also taught me important Git lessons.

Because this was my first larger JavaScript project, I created many branches while experimenting with:

- Dashboard UI
- CRUD structure
- Modal systems
- Refactoring
- Rendering logic

Over time, some branches became difficult to manage and merge.

### What I Learned

- Keep branches smaller
- Merge more often
- Avoid large refactors across many branches
- Maintain a stable main branch
- Git organization is part of software development, not just source control

---

# Planned Improvements for V2

Nestly V2 will evolve from a LocalStorage-based frontend application into a scalable full-stack parenting dashboard focused on child development tracking, practical parenting workflows, and long-term data management.

## Frontend & Architecture

- React-based architecture
- Component-based UI system
- Improved state management
- Reusable component library
- Better folder organization
- Mobile-first responsive design
- Improved accessibility
- Dashboard-focused user experience

## Backend & Data

- Backend API integration
- Database persistence
- User authentication
- Secure user accounts
- API-driven data flow
- Cloud-based data storage
- Multi-device synchronization
- Data validation and error handling

## Child Development Tracking

- Advanced growth charts
- Historical growth tracking
- Growth trend analytics
- Percentile visualization
- Growth milestone tracking
- Normalized height storage
- Child profile management improvements

## Daily Parenting Records

- Feeding records
- Sleep tracking
- Growth records
- Mood tracking
- Symptom tracking
- Medication tracking
- Vaccine records
- Daily notes and observations

## Dashboard & Analytics

- Overview dashboard cards
- Last-record comparison components
- Weekly summary cards
- Monthly summary reports
- Growth trend visualizations
- Sleep trend analytics
- Feeding trend analytics
- Mood trend tracking
- Recent records overview
- Personalized child summaries
- Quick-add workflow components

## Doctor Summary & Record Sharing

- Downloadable child reports
- Doctor-friendly visit summaries
- Growth history exports
- Vaccine history summaries
- Medical record organization
- PDF report generation
- Email sharing support

## AI-Assisted Features

- Growth trend summaries
- Parenting insights dashboard
- Historical pattern analysis
- Record-based recommendations
- Natural language summaries
- Development overview reports

## User Experience Goals

- Reduce parent input fatigue
- Faster data entry workflows
- One-handed mobile interactions
- Guided record creation
- Simplified navigation
- Dashboard-centered experience
- Practical everyday usability

## Long-Term Vision

The long-term vision for Nestly is to become a practical parenting platform that combines:

- Child growth tracking
- Daily parenting records
- Health and vaccine management
- Data-driven insights
- Doctor-friendly reporting
- AI-assisted summaries
- Low-friction user experience

while helping parents better understand and manage their child's development over time.

---

# What I Learned

During the Nestly MVP project, I learned:

- State-based rendering
- Data flow
- LocalStorage synchronization
- Event delegation
- DOM rendering flow
- Reusable component thinking
- Debugging initialization issues
- Chart rendering lifecycle
- Frontend architecture organization
- Separation of concerns
- Git branch management

This project helped me better understand how real frontend applications manage state, rendering flow, persistence, and user interaction.

---

# Biggest Takeaway

> Frontend development is not only about making things work.

It is also about:

- Structure
- State flow
- Data relationships
- Rendering
- Organization
- Maintainability
- Debugging
- Problem solving

---

# How I Used AI During This Project

I used AI primarily as a learning assistant to:

- Clarify JavaScript concepts
- Understand frontend architecture
- Debug UI and state issues
- Validate design decisions
- Break down complex UI logic into smaller steps

Rather than relying on generated solutions, I focused on understanding the reasoning, structure, and data flow behind the implementation.
