import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  private router = inject(Router)

  @Input() breadcrumb!: any[];
  getRoute(item: any, index: number) {
    console.log('getRoute', item, index);
    if (this.breadcrumb.length - 1 == index) {
      return
    } else {
      this.populateRouteParams(item.name, 0)
    }
  }

  populateRouteParams(
    category: string | null,
    page: number | null,
  ) {
    this.router.navigate(['products'], {
      queryParams: { category, page },
      queryParamsHandling: 'merge',
    });
  }
}
