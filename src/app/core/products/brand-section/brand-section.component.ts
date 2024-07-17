import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brand-section',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule],
  templateUrl: './brand-section.component.html',
  styleUrl: './brand-section.component.scss'
})
export class BrandSectionComponent {
  brandList = [
    { name: 'Samsung', count: '12' },
    { name: 'Sony', count: '11' },
    { name: 'Xiaomi', count: '11' },
    { name: 'Apple', count: '9' },
    { name: 'Canon', count: '5' },
    { name: 'HUAWEI', count: '4' },
    { name: 'HP', count: '4' },
    { name: 'Lenovo', count: '3' },
  ];
  selectedBrands!: any;
}
