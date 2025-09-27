import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Books } from './components/books/books';
import { AddBook } from './components/add-book/add-book';

export const routes: Routes = [
  {
    path:"",
    component:Home
  },
  {
    path:"books",
    component:Books
  },
  {
    path:"add-book",
    component:AddBook
  },
   { path: '**', redirectTo: '' } 

];
