import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '@convertedin/shared';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.scss'
})
export class CategorySectionComponent {
  @Input() catagories!: Category[];
  catagoryList = [
    'All Electronics & Mobiles', 
    'Computers & Accessories',
    'Video Games',
    'Mobiles & Accessories',
    'Portable Audio & Video',
    'Wearables',
    'Camera & Photo',
    'Television & VideoAll'
  ]
}
