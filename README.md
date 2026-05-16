# Nestly MVP

Nestly is a child growth tracking app project that I built while learning frontend development.

This was my first larger JavaScript project.  
While building this project, I learned about:

- State management
- Data structure
- Rendering flow
- LocalStorage
- DOM manipulation
- Debugging
- Refactoring
- Git and branch management

This project helped me move from simply writing code to thinking more about frontend structure and application flow.

---

# Features

- Add child profiles
- Save growth records
- Select child cards
- LocalStorage persistence
- Dynamic rendering
- Modal UI system
- Growth history tracking

---

# Tech Stack

- HTML
- CSS
- JavaScript
- LocalStorage

---

# Project Structure

```text
data.js
ui.js
main.js
storage.js
```

---

# Data Structure

Each child contains their own growth records.

```js
{
  id: 1,
  name: "Emma",
  birth: "2022-01-01",
  gender: "female",
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

This helped me learn:

- One-to-many relationships
- Nested arrays and objects
- Grouping related data together

---

# Data Flow

```text
User Input
→ Create Object
→ Push Into Array
→ Save to LocalStorage
→ Re-render UI
```

This was one of the biggest concepts I learned during this project.

I learned that:

> Updating data does not automatically update the UI.

After changing data, I needed to manually re-render the interface.

---

# State Management

I used:

```js
let selectedChild = null;
```

to track the currently selected child.

This helped me understand:

- State-driven UI
- In-memory state
- Persisted state
- Rendering flow

---

# Rendering Strategy

I used a full re-render approach.

Steps:

1. Clear container
2. Read latest data
3. Rebuild UI
4. Append elements again

This helped prevent:

- Duplicate UI
- Old UI state
- Rendering issues

---

# LocalStorage Lessons

I learned that LocalStorage only stores strings.

Because of this, I needed:

```js
JSON.stringify();
JSON.parse();
```

I also learned the difference between:

- Current application state
- Persisted saved state

---

# Separation of Concerns

I separated responsibilities into different files.

| File         | Responsibility          |
| ------------ | ----------------------- |
| `data.js`    | Data creation & storage |
| `ui.js`      | UI rendering            |
| `main.js`    | Event handling & logic  |
| `storage.js` | LocalStorage functions  |

This helped improve:

- Readability
- Organization
- Maintainability

---

# Event Delegation

Instead of attaching event listeners to every card individually, I used event delegation on parent containers.

This helped simplify dynamic card handling.

---

# Modal System

At first, the modal was only for editing.

Later, I refactored it into a reusable modal system for both:

- Add
- Edit

using:

```txt
modalMode = "add" | "edit"
```

This helped reduce duplicated logic.

---

# Debugging & Refactoring Lessons

## Saving Selected Child ID Correctly

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
- Function arguments should match function responsibility

---

## Empty Message Bug

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

## Add Child Input Bug

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
- Structure matters as projects grow

---

# Research & Learning Process

During this project, I searched and learned many frontend concepts.

Some topics I researched:

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
| `form validation`     | Validate user input        |

---

# Git & Branch Lessons

This project also taught me many Git lessons.

Because this was my first larger project, I created many branches while experimenting with:

- Dashboard UI
- CRUD structure
- Modal systems
- Refactoring
- Rendering logic

Over time, some branches became very different from each other.

This caused confusion later.

Problems I experienced:

- Too many branches
- Difficult merges
- Refactoring conflicts
- Losing track of latest stable code

Eventually, I learned that:

> Good Git organization is also part of software development.

I also learned:

- Keep branches smaller
- Merge more often
- Avoid very large refactors across many branches
- Use one stable branch as the main source of truth

One of the biggest lessons was:

> I learned that messy Git branches can become difficult to manage later.

---

# Mistakes I Made

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

# Biggest Takeaway

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

This project helped me better understand how frontend applications are built and organized.
