import { Injectable } from '@angular/core';
import { ModalDialogMessage, Movie, SurveyOptions, SurveyProgress } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor() {}

  API_BASE_URL: string = 'https://api.themoviedb.org/3/';
  API_KEY: string = '4f3b8add18f34ca0edf67451f4fdeee3';

  getLocalStorageMovies(
    key: string,
    surveyOptions: SurveyOptions,
    movies: Movie[]
  ) {
    const localMovies = this.getLocalStorageWithExpiryTime(key);
    for (let i = 0; i < surveyOptions.qtdMovies; i++) {
      movies[i] = localMovies[i];
    }
  }

  getInitialMovies(surveyOptions: SurveyOptions, movies: Movie[]) {
    if (this.getLocalStorageWithExpiryTime(surveyOptions.moviesListType)) {
      this.getLocalStorageMovies(
        surveyOptions.moviesListType,
        surveyOptions,
        movies
      );
    } else {
      this.fetchInitialMovies(surveyOptions, movies);
    }
  }

  async fetchInitialMovies(surveyOptions: SurveyOptions, movies: Movie[]) {
    try {
      const response = await fetch(
        `${this.API_BASE_URL}${surveyOptions.moviesListType}?api_key=${this.API_KEY}`
      );
      const json = await response.json();
      const initialMovies = json.results;
      for (let i = 0; i < surveyOptions.qtdMovies; i++) {
        movies[i] = initialMovies[i];
      }
      this.setLocalStorageWithExpiryTime(
        surveyOptions.moviesListType,
        initialMovies,
        600000 //expiry time 1 hour (600000ms)
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }

  getSimilarMovies(
    surveyOptions: SurveyOptions,
    surveyProgress: SurveyProgress,
    movies: Movie[],
    movieId: number,
    modalDialogMessage: ModalDialogMessage
  ) {
    if (this.getLocalStorageWithExpiryTime(`${movieId} similarMovies`)) {
      this.getLocalStorageMovies(
        `${movieId} similarMovies`,
        surveyOptions,
        movies
      );
      surveyProgress.questionsRemain -= 1;
    } else {
      this.fetchSimilarMovies(
        surveyOptions,
        surveyProgress,
        movies,
        movieId,
        modalDialogMessage
      );
    }
  }

  async fetchSimilarMovies(
    surveyOptions: SurveyOptions,
    surveyProgress: SurveyProgress,
    movies: Movie[],
    movieId: number,
    modalDialogMessage: ModalDialogMessage
  ) {
    try {
      const response = await fetch(
        `${this.API_BASE_URL}movie/${movieId}/similar?api_key=${this.API_KEY}`
      );
      const json = await response.json();
      if (json.total_results === 0) {
        modalDialogMessage.message =
          'Unavailable similar movies for this title! Please choose another one!';
        setTimeout(() => {
          modalDialogMessage.message = '';
        }, 2500);
      } else {
        const similarMovies = json.results;
        for (let i = 0; i < surveyOptions.qtdMovies; i++) {
          movies[i] = similarMovies[i];
        }
        this.setLocalStorageWithExpiryTime(
          `${movieId} similarMovies`,
          similarMovies,
          600000 //expiry time 1 hour (600000ms)
        );
        surveyProgress.questionsRemain -= 1;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  getIMDBLink(
    surveyProgress: SurveyProgress,
    movieId: number,
    modalDialogMessage: ModalDialogMessage
  ) {
    if (localStorage.getItem(`${movieId} IMDBMovieId`)) {
      surveyProgress.finalIMDBLink = JSON.parse(
        localStorage.getItem(`${movieId} IMDBMovieId`) || ''
      );
      surveyProgress.questionsRemain -= 1;
    } else {
      this.fetchIMDBLink(surveyProgress, movieId, modalDialogMessage);
    }
  }

  async fetchIMDBLink(
    surveyProgress: SurveyProgress,
    movieId: number,
    modalDialogMessage: any
  ) {
    try {
      const response = await fetch(
        `${this.API_BASE_URL}movie/${movieId}?api_key=${this.API_KEY}`
      );
      const movieDetails = await response.json();
      if (!movieDetails.imdb_id) {
        modalDialogMessage.message =
          'Unavailable IMDB movie ID for this title! Please choose another one!';
        setTimeout(() => {
          modalDialogMessage.message = '';
        }, 2500);
      } else {
        surveyProgress.finalIMDBLink = `https://www.imdb.com/title/${movieDetails.imdb_id}`;
        localStorage.setItem(
          `${movieId} IMDBMovieId`,
          JSON.stringify(surveyProgress.finalIMDBLink)
        );
        surveyProgress.questionsRemain -= 1;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // ------------ SET AND GET FROM LOCAL STORAGE WITH EXPIRY TIME -------------//
  setLocalStorageWithExpiryTime(key: string, value: any, expiryTime: number) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryTime,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getLocalStorageWithExpiryTime(key: string) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(localStorage.getItem(key) || '');
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
}
