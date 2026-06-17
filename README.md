The assignment had a different approach of creating the element and setting up their attributes, but i found my approach better and easier to build. 
I skipped it because I've worked with the methods (append, prepend, createElement etc...) and have good understanding about it and i know that its a
very very lengthy process because every task card contains of atleast 12 - 15 elements and managing all of them could be very frustrating.
My system and logic is working just fine like it would if i had manual approach.


BACK TO THE EXPLAINATION: 

1. TASK DATA STRUCTURE:

Each task is stored as an object:

{
  id: Number,
  title: String,
  status: "Not Started" | "In - Progress" | "Completed",
  category: String
}

All tasks are stored in an array:

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

2. RENDERING TASKS:

The renderTasks() function:

Clears the UI
Groups tasks by status
Reorders them (In Progress → Not Started → Completed)
Dynamically generates HTML for each task
Injects it into .tasks-container

If no tasks exist:

<div class="empty-container">No Tasks Available</div>

3. ADDING / UPDATING TASKS

When the form is submitted:

Validates input
Creates a new task object
OR updates an existing task if in edit mode (index is set)
Saves everything to localStorage
Re-renders UI

4. TASK ACTIONS:

Each task has a menu (...) with options:

Edit
  Opens the form
  Fills current task data
  Updates existing object instead of creating a new one
Delete
  Confirms before deletion
  Removes task from array + UI + localStorage
Change Status
  Updates task status dynamically
  Changes UI styling based on status
  Re-saves and re-renders tasks

5. THEME TOGGLE (Dark / Light Mode)

Theme switching is handled using CSS variables:

:root {
  --dark;
  --light;
  --text-white;
  --text-smooth;
  --blue-smooth;
}

Clicking the theme button:

Switches variable values
Updates UI colors instantly
Saves state using data-theme

6. LOCALSTORAGE PERSISTENCE:

All tasks are saved using:

localStorage.setItem("tasks", JSON.stringify(tasks));

On page load:

JSON.parse(localStorage.getItem("tasks")) || []

So tasks remain even after refresh or browser restart.
