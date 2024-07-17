import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { environment } from '@environment/*';

@Component({
  selector: 'listing-state-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-state-card.component.html',
  styleUrls: ['./listing-state-card.component.scss'],
})
export class ListingStateCardComponent {
  @Input() assetUrl = 'environment.assetUrl';
  @Input({required:true}) title!:string;
  @Input() description!:string;
}
