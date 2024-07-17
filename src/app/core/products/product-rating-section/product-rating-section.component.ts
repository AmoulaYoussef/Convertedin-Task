import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-product-rating-section',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderModule],
  templateUrl: './product-rating-section.component.html',
  styleUrl: './product-rating-section.component.scss'
})
export class ProductRatingSectionComponent {
  value = 1;
}
