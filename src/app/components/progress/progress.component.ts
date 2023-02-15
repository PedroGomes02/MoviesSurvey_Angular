import {
  state,
  transition,
  trigger,
  style,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Question } from 'src/app/types';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => in', [style({ opacity: 0 }), animate('1000ms ease')]),
    ]),
  ],
})
export class ProgressComponent {
  @Input() questionsRemain: number = 3;
  @Input() qtyMovies: number = 3;

  questionsList: Question[] = [
    { questionsRemainId: 3, text: 'Choose one of the featured movies' },
    { questionsRemainId: 2, text: 'Which one do you like the most?' },
    { questionsRemainId: 1, text: 'Which one do you want to watch now?' },
  ];
}
