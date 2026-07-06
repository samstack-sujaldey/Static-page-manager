import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../services/page.service';
import { Page } from '../models/page';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pageService = inject(PageService);

  pageData?: Page;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.pageService.viewPage(slug).subscribe((data) => {
        this.pageData = data;
      });
    }
  }
}
