import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-final-ad',
  templateUrl: './final-ad.component.html',
  styleUrls: ['./final-ad.component.css'],
})
export class FinalAdComponent {
  @Input() IMDBLink: string = 'https://www.imdb.com/';
}
