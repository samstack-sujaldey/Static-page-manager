import { Component, inject, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { Page } from '../models/page';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  private pageService = inject(PageService);
  pages: Page[] = [];

  pageForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  ngonInit() {
    this.pageService.getPages().subscribe((data) => {
      this.pages = data;
    });
  }

  onSubmit() {
    const newPageData = this.pageForm.value;
    this.pageService.addPages(newPageData).subscribe((response) => {
      console.log('Page successfully saved to the database', response);

      this.pageForm.reset();
      this.pageService.getPages().subscribe((data) => {
        this.pages = data;
      });
    });
  }
}
