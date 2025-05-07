# Bang Search

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FFabian-Kleine%2Fbang-search%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=dependencies.next&logo=next.js&logoColor=next.js&label=Next.js)
[![Repo Language Count](https://img.shields.io/github/languages/count/Fabian-Kleine/bang-search)](https://github.com/Fabian-Kleine/bang-search)
[![Repo Top Language](https://img.shields.io/github/languages/top/Fabian-Kleine/bang-search)](https://github.com/Fabian-Kleine/bang-search)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub last commit](https://img.shields.io/github/last-commit/Fabian-Kleine/bang-search)

## ✨ About

A "search engine" supporting !bangs and more

## ⭐ Features

- [x] **!Bangs**: Shortcuts to search different websites
- [x] **Calculations**: Use `=` to perform calculations
- [x] **Search History**: Save History locally
- [x] **Local-first**: All settings are saved locally
- [ ] **Sync Changes**: Add MongoDB to transfer settings using a code (only temporary storage)
- [ ] **Bookmarks**: Add bookmarked links to the start page or navbar

## 🚀 Tech Stack

*   **[TypeScript](https://www.typescriptlang.org/)**: Superset of JavaScript adding static types.
*   **[Tailwind CSS](https:tailwindcss.com)**: Styling the application.
*   **[Next.js](https://nextjs.org)**: The React Framework
*   **[Shadcn UI](https://ui.shadcn.com)**: A modern component platform

## 🏁 Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Fabian-Kleine/bang-search.git
    cd bang-search
    ```

2.  **Install dependencies:**
    ```bash
    # Using npm
    npm install

    # Or using yarn
    # yarn install
    ```

3.  **Run the development server:**
    ```bash
    # Using npm
    npm run dev

    # Or using yarn
    # yarn dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) (or the specified port) in your browser to see the result.

5. If you make changes to the client search script `/lib/search.ts` dont forget to rebuild it:
    ```bash
    # Using npm
    npm run build:search

    # Or using yarn
    # yarn build:search
    ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.