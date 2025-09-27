import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Reactive forms
import { BookService } from '../../services/bookservice';      // Import service interface
import { Book } from '../../models/model'; //Import interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-book.html',
  styleUrls: ['./add-book.css']       
})
export class AddBook implements OnInit {   
  addForm!: FormGroup;                              
  submitted = false;

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  // getter for form controls
  get f(): { [key: string]: any } {
    return this.addForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addForm.invalid) return;

    const newBook: Book = {
      id: this.bookService.getNextId(),
      title: this.f['title'].value,       //Access with brackets for strict TS
      author: this.f['author'].value,
      price: this.f['price'].value,
      description: this.f['description'].value,
     
    };

    this.bookService.addBook(newBook);

    this.addForm.reset();
    this.submitted = false;

    alert('Book added successfully!');
  }
}
