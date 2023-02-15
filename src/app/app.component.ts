import {
  state,
  transition,
  trigger,
  style,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from './services/movies.service';
import {
  ModalDialogMessage,
  Movie,
  SurveyOptions,
  SurveyProgress,
} from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => in', [style({ opacity: 0 }), animate('2000ms ease')]),
    ]),
    trigger('fadeInOutAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => in', [style({ opacity: 0 }), animate('1000ms ease')]),
      transition('in => void', animate('1000ms ease', style({ opacity: 0 }))),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}
  
  title: string = 'MoviesSurvey_Angular';
  movies: Movie[] = [];
  moviesListTypes = {
    popular: 'movie/popular',
    topRated: 'movie/top_rated',
    weekTrending: 'trending/movie/week',
  };
  surveyOptions: SurveyOptions = {
    moviesListType: this.moviesListTypes.weekTrending,
    qtdMovies: 3, //Maximum quantity: 20
  };
  surveyProgress: SurveyProgress = {
    questionsRemain: 3,
    finalIMDBLink: 'https://www.imdb.com/',
  };
  modalDialogMessage: ModalDialogMessage = { message: '' };

  ngOnInit() {
    this.moviesService.getInitialMovies(this.surveyOptions, this.movies);
  }

  handlerClick(movieId: number) {
    if (this.surveyProgress.questionsRemain > 1) {
      this.moviesService.getSimilarMovies(
        this.surveyOptions,
        this.surveyProgress,
        this.movies,
        movieId,
        this.modalDialogMessage
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.moviesService.getIMDBLink(
        this.surveyProgress,
        movieId,
        this.modalDialogMessage
      );
    }
  }
}
