# ToDo App 🗒

## 🍿 Video of ToDo App 
https://github.com/user-attachments/assets/43c4d884-54c4-4194-9deb-b90ac52ba25e

## 🔦 Lighthous 
### For mobile
https://github.com/user-attachments/assets/b992e810-9ca6-43be-890e-d21c26f8fd86
### For desktop
https://github.com/user-attachments/assets/d38a0be2-b3ce-42aa-aa65-653dc5822458

## 🔌 About Project
<details>
  <summary><b>HTML</b></summary>
  This file serves as the blueprint of the application. It is crafted with a focus on SEO, 
  performance, and screen-reader accessibility.
  
   - Semantic HTML5: Uses descriptive tags like <main>, <section>, and <nav> to define the document outline, improving both SEO and accessibility.
   - BEM Methodology: Implements the Block Element Modifier naming convention (e.g., main__header, todo-form__input) to ensure modular, readable, and conflict-free CSS.
   - Accessibility (A11y) Focus: Includes aria-label attributes on interactive elements (like the theme toggle and submit buttons); Uses aria-hidden="true" for decorative elements (clouds, stars, icons) to prevent screen-reader clutter; Properly linked <label> and <input> elements for a better user experience.
   - Performance Optimization: Strategic placement of <script> tags with defer and type="module" attributes to prevent render-blocking; preconnect hints for Google Fonts to speed up resource discovery.
 
</details>
<details>
  <summary><b>SCSS</b></summary>
  
  The project uses a modular SCSS structure to ensure maintainability, readability, and ease of scaling. Instead of a single giant stylesheet, the logic is split into several domain-specific folders:
  <details>
    <summary>abstracts/</summary>
    
    The "engine" of the styles. Contains global variables (colors, fonts, sizes) and mixins (media queries, reusable flex/grid patterns). These files generate no CSS output on their own but are essential for the rest of the project.
  </details>
  <details>
    <summary>base/</summary>
    
    The foundation. Includes CSS resets, typography rules, and global styles for common elements like <body> or <a>. This ensures a consistent look and feel across the entire app.
  </details>
  <details>
    <summary>components/</summary>
    
    The "building blocks". Contains styles for independent, reusable UI elements like buttons, input fields, and the task items themselves. Each file follows the BEM methodology.
  </details>
  <details>
    <summary>layout/</summary>
    
    The structural layer. Manages the high-level arrangement of the page, such as the header section and the main task container grid/flex layouts.
  </details>
  <details>
    <summary>main.scss</summary>
    
    The orchestrator. This is the entry point where all partials are imported. It is the only file compiled into the final CSS production bundle.
  </details>
  
</details>
<details>
  <summary><b>JS</b></summary>
   I built this code using modular JavaScript (ES6 Modules) and the principle of separation of concerns. 
   Instead of a single large file where everything is jumbled together, I divided the application into separate parts, making the code easier 
   to read and more understandable.
  <details>
    <summary><b>main.js</b></summary>
      This is the entry point of the application. It connects all independent modules and manages the high-level logic of the Todo app. 
      Key responsibilities:
        
        - Initialization: Loads existing tasks from LocalStorage and triggers the initial render of the UI.
        - Event Listeners: Sets up global listeners for task creation, theme switching, and task filtering.
        - Event Delegation: Efficiently handles user interactions (like deleting or checking tasks) by listening to events at the container level.
        - State Coordination: Acts as a bridge between data updates (Storage) and UI changes (DOM).
        
  </details>
  <details>
    <summary><b>create.js</b></summary>
    This module is responsible for DOM generation. It focuses on transforming task objects into semantic and accessible HTML elements.
    Key responsibilities:

      - Dynamic Task Rendering: Generates the list of tasks by mapping through the data array and creating complex list items.
      - A11y Implementation: Ensures every generated element has necessary accessibility attributes (e.g., aria-label for buttons and checkbox roles).
      - BEM Methodology: Applies CSS classes according to the BEM (Block Element Modifier) pattern for scalable and predictable styling.
      - Modular Component Creation: Uses helper functions to build sub-elements like buttons, icons, and text containers, keeping the code DRY (Don't Repeat Yourself).
    
  </details>
  <details>
    <summary><b>delete.js</b></summary>
    This module handles the deletion lifecycle of a task. It ensures that when a user removes an item, the change is reflected both in the UI and the underlying data structure.
    Key responsibilities:

      - State Synchronization: Identifies the specific task by its unique ID and removes it from the main data array.
      - UI Update Trigger: Communicates with the rendering logic to refresh the list once an item is removed.
      - Storage Cleanup: Ensures that the updated array (without the deleted task) is immediately saved back to LocalStorage.
      - Resource Management: Helps maintain a lean DOM by removing unnecessary nodes and preventing memory leaks.
    
  </details>
  <details>
    <summary><b>function.js</b></summary>
     This module serves as a collection of reusable utility functions. It contains independent logic that supports various features of the application without directly manipulating the DOM.
     Key responsibilities:
    
      - ID Generation: Includes the idCreator function (using crypto.randomUUID()) to ensure every task has a unique and reliable identifier.
      - Data Transformation: Handles logic for formatting dates, strings, or filtering arrays based on specific criteria.
      - Input Validation: Provides helpers to sanitize user input and prevent empty or invalid tasks from being added.
      - State Helpers: Contains small, focused functions that help determine the current application status (e.g., counting active tasks).

  </details>
  <details>
    <summary><b>dom-variables.js</b></summary>
    This module acts as a centralized repository for all DOM element references. It ensures that the application has a single source of truth for interacting with the HTML structure.
    Key responsibilities:
    
     - Element Selection: Stores all necessary nodes (inputs, lists, buttons, containers) using efficient CSS selectors.
     - Namespace Organization: Groups related elements together, making it easy to find and use them across different modules.
     - Maintenance Efficiency: If the HTML structure changes (e.g., a class name is renamed), the update only needs to be made in this single file, preventing bugs in the logic modules.
    
  </details>
  <details>
    <summary><b>local-storage.js</b></summary>
    This module manages the browser's storage logic. It acts as a lightweight database handler, ensuring that the application state is synchronized with LocalStorage.
    Key responsibilities:

     - State Persistence: Saves the current array of tasks into the browser's memory whenever a change occurs (adding, deleting, or toggling).
     - Data Retrieval: Fetches and parses stored data upon application startup, allowing for a seamless user experience across sessions.
     - Serialization: Handles the conversion of complex JavaScript objects into JSON strings and vice-versa.
     - Storage Integrity: Provides safe methods to clear or update data without affecting other application settings.
    
  </details>
  <details>
    <summary><b>theme-toggle.js</b></summary>
    This module manages the visual state of the application. It provides a seamless transition between light and dark modes while ensuring the user's preference is respected across sessions.
    Key responsibilities:

     - Dynamic Theme Switching: Toggles CSS classes on the <body> or root element to swap color variables in real-time.
     - Preference Persistence: Automatically saves the selected theme to LocalStorage, so the app always opens with the user's favorite look.
     - System Preference Detection: Can be configured to respect the user's operating system settings (Dark/Light mode) on the first visit.
     - UI Syncing: Updates the theme-toggle icon (e.g., Sun/Moon) to match the currently active mode.
    
  </details>
</details>

## 🪛 Tech Stack

 - Logic: Vanilla JavaScript (ES6+ Modules)
 - Styles: SCSS (Variables, Mixins, BEM)
 - Structure: Semantic HTML5
 - Icons: SVG for crisp rendering

## 👩🏻‍🎓 What I Learned

This project represents my journey from writing functional code to engineering a clean, professional, and optimized web application. 
It is divided into two branches: main (initial version) and updates (refactored version).

  - SCSS & Architecture
I deeply explored the BEM methodology and realized how crucial it is for maintaining large stylesheets. By practicing with BEM, I learned to write CSS that is predictable and easy to manage. My SASS skills now include:
Modularization: Efficient use of partials, `@use`, and `@forward` for a clean project structure.
Logic: Implementing `variables`, `mixins`, `nesting`, `extends`
  - JavaScript Refactoring (The updates branch)
  While the first version of the app was functional, I found it a bit chaotic. In the second version, I focused on:
    - Clean Code & Readability: Moving away from "one-function-does-it-all" to a functional approach.
    - Modular JS: Breaking down complex logic into small, single-purpose modules with ES6 imports/exports.
    - Abstraction: Identifying repetitive tasks and creating reusable helper functions.
  - Performance Optimization (Lighthouse)
  Once I was satisfied with the code structure, I used Google Lighthouse for a deep audit.
    - Initial scores weren't perfect, so I carefully analyzed the feedback regarding the critical rendering path, accessibility, and network payloads.
    - I refactored the HTML semantics, optimized font loading, and adjusted the script execution order.
    - Result: I am incredibly proud to have achieved a perfect 100/100 score across all categories (Performance, Accessibility, Best Practices, and SEO).

## 🚀 How It Can Be Improved?

While this project currently meets high-quality standards (Lighthouse 100/100), there is always room for growth and professional evolution:

1. Framework Migration (React/Vue)
  - The next logical step is to migrate the application to a modern framework like React. This would allow for better state management using hooks (like useState or useReducer) and a more component-based UI approach.
  - Transitioning to a virtual DOM would make updates even more efficient as the number of tasks grows.

2. Advanced Drag-and-Drop:
Implementing a native Drag-and-Drop API to allow users to manually reorder their tasks, providing a more intuitive and interactive user experience.

3. Backend Integration (Node.js/Firebase):
Moving from LocalStorage to a real database (like Firebase or a custom Node.js/MongoDB backend) to enable user accounts. This would allow users to sync their tasks across different devices and browsers.

4. Unit Testing:
Adding automated tests using Jest or Vitest to ensure that core logic (like ID generation, task filtering, and storage synchronization) remains stable during future updates.

5. Task Deadlines & Notifications:
Adding a "Due Date" feature with browser notifications to remind users of upcoming tasks, turning the app into a full-fledged productivity tool.

## 🔗[Live Demo Link](https://mamartam.github.io/to-do-app-crud/)
