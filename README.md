
# JavaScript Applications - SoftUni

This repository contains the final exam project for the SoftUni JavaScript Applications course, along with additional practice apps from previous exams. The apps demonstrate my ability to work with various technologies, including **lit-html**, **page.js**, and testing frameworks like **Chai**, **Mocha**, and **Playwright-Chromium**.

## Apps Overview

1. **Final Exam App**  
   The final exam app is a **Single Page Application (SPA)** with multiple views, including registration and login functionality. It allows logged-in users to create, edit, and delete entries.  
   - **Technologies Used:** lit-html, page.js, Chai, Mocha, Playwright-Chromium  
   - **Features:**  
     - User registration and login  
     - Create, edit, and delete functionality for logged-in users  
     - Bonus functionality like search or buttons (varies per app)  
     - **Practice server** and **HTML template** provided by SoftUni for the exam app

2. **Practice Apps**  
   These apps were created during previous exam practice sessions and serve as an example of my learning journey.  
   - The apps follow similar patterns, testing my ability to implement various functionalities using the same technologies.  

## Server

Each app comes with its own practice server located in the `server` folder. You can start the server using the following command:

```bash
node server
```

Ensure that **node_modules** are installed before running the apps. Run the following to install dependencies:

```bash
npm install
```

## Issues with Practice Apps

- **General Issue in All Apps:**  
  When creating a new entry, the app redirects to the list of entries, but the new entry is visible only after a refresh. This issue is fixed in the final exam app.

- **Sole Mates App:**  
  The search functionality doesn't work as expected.

- **MusicLibrary App:**  
  - The "like" functionality doesn’t work.  
  - There is a promise error affecting some functionality.  
  - Logged-in users can only access the details page for entries they’ve added.

## Notes

- The final exam app is fully functional and meets all the exam requirements, while the practice apps are provided for learning purposes and may contain some issues.
  
Thank you for checking out my work!
