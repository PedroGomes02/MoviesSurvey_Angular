import {
  state,
  transition,
  trigger,
  style,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/types';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => in', [style({ opacity: 0 }), animate('1000ms ease')]),
    ]),
  ],
})
export class MoviesComponent {
  @Input() movies: Movie[] = [];
  @Output() movieId = new EventEmitter<number>();

  handlerClick(movieId: number) {
    this.movieId.emit(movieId);
  }
}
