import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private api = 'https://dummyjson.com/products';
  private books$ = new BehaviorSubject<Book[]>([]);
  public readonly booksObservable$ = this.books$.asObservable();

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks() {
    this.http.get<any>(this.api).pipe(
      map(res => res.products || []),
      map((products: any[]) =>
        products.map(p => ({
          id: p.id,
          title: p.title,
          author: p.brand,                  // brand → author
          price: p.price,
          description: p.description || '',
          rating: p.rating ? Math.round(p.rating) : Math.floor(Math.random() * 5) + 1
        }))
      )
    ).subscribe(books => this.books$.next(books));
  }

  getBooks(): Observable<Book[]> {
    return this.booksObservable$;
  }

  findById(id: number): Book | undefined {
    return this.books$.getValue().find(b => b.id === id);
  }


  updateBook(updatedBook: Book) {
    const all = this.books$.getValue();
    const idx = all.findIndex(b => b.id === updatedBook.id);
    if (idx >= 0) {
      all[idx] = updatedBook;
      this.books$.next([...all]);
    }
  }

  deleteBook(id: number) {
    const all = this.books$.getValue().filter(b => b.id !== id);
    this.books$.next(all);
  }

  // Add a new book
addBook(book: Book) {
  const currentBooks = this.books$.getValue(); // get current array from BehaviorSubject
  currentBooks.push(book);                     // add the new book
  this.books$.next([...currentBooks]);         // emit updated array
}

// Generate next unique ID
getNextId(): number {
  const currentBooks = this.books$.getValue();
  return currentBooks.length ? Math.max(...currentBooks.map(b => b.id)) + 1 : 1;
}

}
