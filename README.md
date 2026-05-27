# Nestly

A frontend child growth tracking dashboard built with HTML, CSS, and JavaScript.

Nestly allows parents to create child profiles, track growth history, visualize growth data, and persist application state using LocalStorage.

This project was designed not only as a CRUD application, but also as a frontend architecture and state management learning project.

While building Nestly, I focused on understanding:

- state-based UI rendering
- data flow between state and UI
- LocalStorage persistence and restoration
- event-driven architecture
- chart lifecycle management
- empty state handling
- separation of concerns
- reusable UI structure

Nestly helped me better understand how real frontend applications synchronize state, rendering, persistence, and user interaction.

---

# Features

- Add / edit / delete child profiles
- Add and manage growth records
- Growth chart visualization using Chart.js
- LocalStorage persistence
- Restore selected child after refresh
- Empty state handling
- Modal-based add/edit flow
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
├── style.css
├── js/
│   ├── main.js
│   ├── data.js
│   ├── ui.js
│   └── storage.js
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

Controls modal behavior:

```js
modalMode = "add" | "edit";
```

---

## currentInputs

Stores modal input references to avoid repeated DOM queries.

---

## growthChart

Stores the current Chart.js instance.

Used to safely destroy and recreate charts.

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

The application supports:

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

The app restores saved application state after refresh using:

- `JSON.stringify()`
- `JSON.parse()`

---

## Chart Lifecycle Management

Before rendering a new chart:

- previous chart instances are destroyed
- chart state is reset

This prevents overlapping charts and stale UI.

---

# Key Design Decisions

## Reusable Modal Structure

A single modal is reused for both:

- Add Child
- Edit Child

flows using a `modalMode` state.

---

## Minimal Persisted Data

Instead of storing an entire selected child object in LocalStorage:

```js
saveSelectedChildId(child.id);
```

Only the child ID is persisted and restored later using:

```js
children.find();
```

---

## Full UI Re-render Strategy

Instead of manually updating individual DOM nodes, the app re-renders UI sections after state changes.

Benefits:

- prevents duplicate UI
- keeps UI synchronized with state
- simplifies debugging

---

# Planned Improvements for V2

Nestly V2 is planned as a more advanced full-stack child growth tracking dashboard focused on practical parenting workflows, frontend architecture, and long-term scalability.

### Frontend & Architecture

- React-based architecture
- Component-based UI structure
- Improved state management
- Backend + database integration
- Authentication and user accounts
- API-based data flow
- Better scalability and maintainability

---

### Core Growth Tracking

V2 will improve the current growth tracking system by adding:

- advanced growth charts
- historical growth tracking
- percentile visualization
- growth trend analytics
- normalized height storage (`heightInches`)

---

### Doctor Summary & Record Sharing

One planned feature is helping parents organize and share child growth history before medical visits.

Possible features include:

- downloadable growth reports
- doctor-friendly summaries
- exportable child records
- email sharing support
- organized historical growth data

The goal is to make communication with doctors easier and more structured.

---

### AI-Assisted Features

Planned AI-assisted features may include:

- growth trend summaries
- simplified parenting insights
- historical pattern summaries
- dashboard-based growth overviews

The focus is on informational assistance rather than medical diagnosis.

---

### User Experience Philosophy

A major focus for V2 is reducing input fatigue for parents.

The application will prioritize:

- fast interactions
- minimal typing
- mobile-friendly UI
- one-hand-friendly input flows
- guided interactions
- dashboard-centered UX

The goal is to create a lightweight and practical experience that parents can use consistently without feeling overwhelmed.

---

### Long-Term Vision

The long-term vision for Nestly is to build a practical parenting dashboard that combines:

- growth tracking
- organized child records
- simple workflows
- AI-assisted summaries
- low-friction user experience

while helping parents better understand and manage their child’s development data.

---

# What I Learned

During the Nestly MVP project, I learned important frontend development concepts such as:

- state-based rendering
- LocalStorage synchronization
- UI consistency after refresh
- event delegation
- DOM rendering flow
- reusable component thinking
- debugging initialization issues
- chart rendering lifecycle
- frontend architecture organization
- separation of concerns

This project helped me better understand how real frontend applications manage state, rendering flow, persistence, and user interaction.

---

# How I Used AI During This Project

I used AI primarily as a learning assistant to:

- clarify JavaScript concepts
- understand frontend architecture
- debug UI and state issues
- validate design decisions
- break down complex UI logic into smaller steps

Rather than relying on generated solutions, I focused on understanding the reasoning, structure, and data flow behind the implementation.
