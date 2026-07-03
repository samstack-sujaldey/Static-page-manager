import { PageService } from './../services/page.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../models/page';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  private route = inject(ActivatedRoute);
  private pageService = inject(PageService);

  pageData?: Page;

  ngOnInit() {
    const currentSlug = this.route.snapshot.paramMap.get('slug');
    console.log('the current slug is : ', currentSlug);
    if (currentSlug) {
      this.pageService.viewPage(currentSlug).subscribe((data) => {
        this.pageData = data;
      });
    }
  }
}
