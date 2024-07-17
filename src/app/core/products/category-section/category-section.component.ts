import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.scss'
})
export class CategorySectionComponent {
  private router = inject(Router)

  @Input() catagories!: string[];
  @Input() breadcrumb!: any[];
  searchByCategory(category: string, page = 0) {
    this.router.navigate(['products'], {
      queryParams: { category, page },
      queryParamsHandling: 'merge',
    });
  }
}
