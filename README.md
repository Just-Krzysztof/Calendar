# Calendar Task Manager

## Overview

The **Calendar Task Manager** is a simple React application that allows users to view a calendar, add tasks to specific days, and manage these tasks. Tasks can be marked as completed, and their state will persist even after refreshing the page, thanks to local storage.

## Features

- **Monthly Calendar View:** Displays the days of the current month.
- **Add Tasks:** Users can add tasks to any day in the calendar.
- **Task Completion:** Tasks can be marked as completed by checking a checkbox, and they will appear with a strikethrough when completed.
- **Persistent Storage:** Tasks and their completion status are saved in local storage, so they persist across page reloads.
- **View Tasks:** Users can view all tasks for a selected day or all tasks for the entire month.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- Basic knowledge of React and JavaScript.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/calendar-task-manager.git
   cd calendar-task-manager
   ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

2. **Start the application:**
    ```bash
    npm run dev
    ```

This will start the development server and open the application in your default browser. The app should be running at http://localhost:3000.

```calendar-task-manager/
├── src/
│   ├── components/
│   │   ├── Day.tsx         # Day component representing each day in the calendar
│   │   ├── Modal.tsx       # Modal component for adding and viewing tasks
│   │   ├── Calendar.tsx    # Main Calendar component
│   │   └── Calendar.css    # Custom styles
│   └── ...
├── package.json
└── README.md
```

## Usage
1. **Navigate the Calendar:**
-	Use the “Prev” and “Next” buttons to navigate between months.
2. **Add Tasks:**
-	Click on any day in the calendar to open the modal and add a task for that day.
3. **View Tasks:**
- Click the “View All Tasks” button to see all tasks for the current month.
3. **Mark Tasks as Completed:**
-	Check the checkbox next to a task to mark it as completed. Completed tasks will be displayed with a strikethrough.

## Persistent Data
- Tasks are stored in the browser’s localStorage, ensuring that they persist even after the page is refreshed or the browser is closed.
- Tasks are loaded from localStorage when the app is initialized.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
