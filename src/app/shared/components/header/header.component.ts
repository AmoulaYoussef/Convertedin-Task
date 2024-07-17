import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuSub: string[] = ['Electronics', 'Mobiles', 'Men', 'Women', 'Home', 'Beauty && Health', 'Baby && Toys', 'Supermarket', 'Sell On Platform', 'New Deals'];
}
