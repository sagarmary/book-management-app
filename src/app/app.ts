import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { Books } from './components/books/books';
import { AddBook } from './components/add-book/add-book';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Books, AddBook,RouterModule,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isMenuOpen = false;
   toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
}
