import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/bookservice';
import { Book } from '../../models/model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class Books implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchQuery = '';
  page = 1;
  pageSize = 10;
  loading = true;

  // Edit form
  editForm: FormGroup;
  editBookId: number | null = null; // currently editing book id
  showEditForm = false;

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.applyFilter();
      this.loading = false;
    });
  }

 applyFilter(resetPage: boolean = false) {
  const q = this.searchQuery.trim().toLowerCase();
  this.filteredBooks = q
    ? this.books.filter(b => b.title.toLowerCase().includes(q))
    : [...this.books];

  if (resetPage) {
    this.page = 1; // only reset page if explicitly needed
  } else {
    // ensure page is within valid range after filtering
    if (this.page > this.totalPages()) this.page = this.totalPages();
  }
}


  get pagedBooks(): Book[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredBooks.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.pageSize) || 1;
  }

  setPage(n: number) {
    if (n < 1) n = 1;
    if (n > this.totalPages()) n = this.totalPages();
    this.page = n;
  }

 deleteBook(id: number) {
  if (!confirm('Are you sure you want to delete this book?')) return;
  this.bookService.deleteBook(id);

 
  this.applyFilter(false);
}


 
  startEdit(book: Book) {
    this.editBookId = book.id;
    this.editForm.patchValue({
      title: book.title,
      author: book.author,
      price: book.price,
      description: book.description
    });
    this.showEditForm = true;
  }

  // Saves the updated details 
  saveEdit() {
  if (!this.editForm.valid || this.editBookId == null) return;

  const updatedBook: Book = {
    id: this.editBookId,
    ...this.editForm.value
  };

  this.bookService.updateBook(updatedBook);
  this.showEditForm = false;
  this.editBookId = null;

  
  this.applyFilter(false);
}

  cancelEdit() {
    this.showEditForm = false;
    this.editBookId = null;
  }
}
