<<<<<<< HEAD
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
=======
# Nestly MVP

Nestly is a child growth tracking app that I built while learning frontend development.

Nestly MVP was my first project-based learning application while studying frontend development.

This was my first larger JavaScript project.  
Through this project, I learned about:

- State management
- Data flow
- DOM manipulation
- LocalStorage
- Rendering
- Debugging
- Refactoring
- Git branch management

---

## Features

- Add child profiles
- Save growth records
- Select child cards
- Dynamic UI rendering
- Modal UI system
- LocalStorage persistence

---

## Problems I Solved

- Keeping UI synchronized with application state
- Preventing duplicate UI rendering
- Managing modal state across add/edit flows
- Persisting data with LocalStorage
- Organizing growing frontend code structure

---

## Tech Stack
>>>>>>> readme

- HTML
- CSS
- JavaScript
<<<<<<< HEAD
- Chart.js
=======
>>>>>>> readme
- LocalStorage

---

<<<<<<< HEAD
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
=======
## Project Structure

```text
data.js
ui.js
main.js
storage.js
>>>>>>> readme
```

---

<<<<<<< HEAD
# File Responsibilities

| File       | Responsibility                   |
| ---------- | -------------------------------- |
| main.js    | Application logic and event flow |
| data.js    | Data creation and data structure |
| ui.js      | UI rendering and DOM creation    |
| storage.js | LocalStorage persistence         |

---

# Data Structure
=======
## Data Structure
>>>>>>> readme

Each child contains their own growth records.

```js
{
<<<<<<< HEAD
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
=======
  id: 1,
  name: "Emma",
  growthRecords: [
    {
      date: "2026-01-01",
      heightFt: 3,
      heightIn: 5,
      weight: 40
>>>>>>> readme
    }
  ]
}
```

<<<<<<< HEAD
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
=======
This helped me understand:

- One-to-many relationships
- Nested data structures
- Grouping related data together

---

## Data Flow

```text
User Input
→ Create Object
→ Update Array
→ Save to LocalStorage
→ Re-render UI
```

One important lesson I learned was:

> Updating data does not automatically update the UI.

After changing data, I needed to re-render the interface manually.

---

## State Management

I used several state variables to control the application flow.

```js
let selectedChild = null;
let currentInputs = {};
let modalMode = null;
let growthChart = null;
```

### Purpose

| State           | Purpose                                           |
| --------------- | ------------------------------------------------- |
| `selectedChild` | Tracks the currently selected child               |
| `currentInputs` | Stores modal input elements                       |
| `modalMode`     | Controls whether the modal is in add or edit mode |
| `growthChart`   | Stores the current chart instance                 |

This helped me understand:

- State-driven UI
- UI flow management
- Dynamic rendering
- Modal behavior
- Managing application state across different features

---

## Architecture & UI Lessons

### Separation of Concerns

I separated responsibilities into different files.

| File         | Responsibility          |
| ------------ | ----------------------- |
| `data.js`    | Data creation & storage |
| `ui.js`      | UI rendering            |
| `main.js`    | Event handling & logic  |
| `storage.js` | LocalStorage functions  |

This improved:

- Readability
- Organization
- Maintainability

---

### Rendering Strategy

I used a full re-render approach:

1. Clear container
2. Read latest data
3. Rebuild UI
4. Append elements again

This helped prevent:

- Duplicate UI
- Old UI state
- Rendering issues

---

### Event Delegation

Instead of attaching event listeners to every card individually, I used event delegation on parent containers.

This simplified handling dynamic elements.

---

### Reusable Modal System

At first, the modal was only used for editing.

Later, I refactored it into a reusable modal system for both:

- Add
- Edit

using:

```txt
modalMode = "add" | "edit"
```

This helped reduce duplicated logic.

---

## Debugging Lessons

### Saving Selected Child ID Correctly

Originally I wrote:

```js
saveSelectedChildId(child);
```

Later I realized the function only needed the child ID.

I changed it to:
>>>>>>> readme

```js
saveSelectedChildId(child.id);
```

<<<<<<< HEAD
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
=======
This taught me:

- Save only necessary data
- Match function arguments with function responsibility

---

### Empty Message Bug

Problem:

The empty message only appeared after page refresh.

Cause:

```js
recordsContainer.innerHTML = "";
```

removed the message element from the DOM.

Fix:

```js
recordsContainer.appendChild(emptyMessage);
```

This taught me:

- Clearing containers removes child elements
- Rendering order matters

---

### Add Child Input Bug

Problem:

The Add Child form appeared inside the dropdown list.

Cause:

```js
childList.appendChild(inputWrapper);
```

Both the form and child cards used the same container.

Solution:

- Child list only renders cards
- Form moved into modal UI

This taught me:

- UI containers need clear responsibilities
- Structure becomes important as projects grow

---

## Research & Learning Process

During this project, I researched many frontend concepts.

Some topics I searched:

| Topic                 | Reason                     |
| --------------------- | -------------------------- |
| `addEventListener`    | Handle clicks and events   |
| `event.currentTarget` | Detect selected card       |
| `querySelector`       | Find elements inside cards |
| `createElement`       | Dynamically create UI      |
| `appendChild`         | Add elements into DOM      |
| `input.value`         | Read user input            |
| `textContent`         | Update UI text             |
| `classList.toggle`    | Manage modal UI state      |
| `JSON.stringify`      | Save LocalStorage data     |
| `event delegation`    | Handle dynamic elements    |

---

## Git & Branch Lessons

This project also taught me many Git lessons.

Because this was my first larger project, I created many branches while experimenting with:

- Dashboard UI
- CRUD structure
- Modal systems
- Refactoring
- Rendering logic

Over time, some branches became very different from each other.

This caused problems later:

- Too many branches
- Difficult merges
- Refactoring conflicts
- Losing track of latest stable code

This project taught me that:

> Good Git organization is also part of software development.

I also learned:

- Keep branches smaller
- Merge more often
- Avoid very large refactors across many branches

---

## Mistakes I Made

During early development, I accidentally committed:

```text
node_modules
```

to Git.

This taught me:

- Importance of `.gitignore`
- Git cleanup
- Repository management

---

## Biggest Takeaway

The biggest lesson from building this MVP was:

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

## Future Improvements

- Improve responsive UI
- Improve dashboard visuals
- Add better chart interactions

---

## Next Version: Nestly V2

Nestly V2 will be a more production-ready version of this project.

The goal of V2 is to move from a frontend-only LocalStorage app to a full-stack parenting dashboard.

Planned improvements:

- Rebuild the frontend with React
- Add user authentication
- Store child and growth data in a real database
- Create backend APIs for children and growth records
- Add dashboard analytics and charts
- Improve responsive UI design
- Add daily check-in records
- Add basic health tracking such as temperature and symptoms
- Explore AI-powered parenting insights in the future
>>>>>>> readme
