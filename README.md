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

- HTML
- CSS
- JavaScript
- LocalStorage

---

## Project Structure

```text
data.js
ui.js
main.js
storage.js
```

---

## Data Structure

Each child contains their own growth records.

```js
{
  id: 1,
  name: "Emma",
  growthRecords: [
    {
      date: "2026-01-01",
      heightFt: 3,
      heightIn: 5,
      weight: 40
    }
  ]
}
```

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

```js
saveSelectedChildId(child.id);
```

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
