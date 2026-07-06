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

  editingId = '';

  pageForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  ngOnInit() {
    this.getAllPages();
  }

  getAllPages() {
    this.pageService.getPages().subscribe((data) => {
      this.pages = data;
    });
  }

  onSubmit() {
    const pageData = this.pageForm.value;

    if (this.editingId) {
      this.pageService.updatePage(this.editingId, pageData).subscribe(() => {
        this.editingId = '';
        this.pageForm.reset();
        this.getAllPages();
      });
    } else {
      this.pageService.addPages(pageData).subscribe(() => {
        this.pageForm.reset();
        this.getAllPages();
      });
    }
  }

  editPage(page: Page) {
    this.editingId = page._id!;

    this.pageForm.patchValue({
      title: page.title,
      content: page.content,
    });
  }

  deletePage(id: string) {
    if (!confirm('Delete this page?')) return;

    this.pageService.deletePage(id).subscribe(() => {
      this.getAllPages();
    });
  }
}
