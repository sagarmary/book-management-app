#  Book Management App
 
A responsive, full-featured **Book Management App** built with Angular. This app allows users to view, search, add, edit, and delete books in a clean, intuitive interface. Designed for both desktop and mobile users.  

---

##  Features

- **View Books:** Paginated list of books with search functionality.  
- **Add Book:** Add a new book with validation for required fields.  
- **Edit Book:** Update existing book details using a modal form.  
- **Delete Book:** Remove books with confirmation.  
- **Responsive Design:** Works on desktop, tablet, and mobile devices.  
- **Pagination:** Easily navigate through large lists of books.  
- **Local Mock Data:** Uses a BehaviorSubject to manage book data locally (no backend required).  



##  Technology Stack

- **Framework:** Angular 20  
- **Language:** TypeScript  
- **Styling:** CSS / Tailwind (optional)  
- **Reactive Forms:** Angular ReactiveFormsModule  
- **State Management:** BehaviorSubject for local data handling  
- **Routing:** Angular Router  

---

##  Installation

1. Clone the repository:

```bash
git clone https://github.com/sagarmary/book-management-app


Navigate to the project directory:

cd book-management-app


Install dependencies:

npm install


Run the app:

ng serve


Open your browser and go to:

http://localhost:4200

Usage

Home Page:

Displays a welcome message and navigation buttons.

Books Page:

View all books in a paginated table.

Search books by title using the search bar.

Edit or delete books using action buttons.

Add Book Page:

Fill in the form with title, author, price, and description.

Submit to add a new book.

All data is handled locally in the app; no external API is required.

🔧 Folder Structure
src/
│
├─ app/
│  ├─ components/
│  │  ├─ home/          # Home page component
│  │  ├─ books/         # Books list component
│  │  └─ add-book/      # Add book component
│  │
│  ├─ models/
│  │  └─ model.ts       # Book interface
│  │
│  ├─ services/
│  │  └─ bookservice.ts # BookService with CRUD methods
│  │
│  └─ app.module.ts
│


Key Highlights

Clean component-based architecture.

Reactive forms with validation for all fields.

Local state management using BehaviorSubject ensures smooth updates.

Fully responsive layout for mobile and desktop.

Easy to extend for backend integration in the future.

->Future Enhancements

Integrate a backend API for persistent data storage.

Add user authentication for secured operations.

Implement filter by author, price range, or rating.