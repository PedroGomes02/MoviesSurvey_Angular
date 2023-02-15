interface Movie {
  id: number;
  title: string;
  poster_path: string;
  external_ids: { imdb_id: string };
}

interface SurveyOptions {
  moviesListType: string;
  qtdMovies: number;
}

interface SurveyProgress {
  questionsRemain: number;
  finalIMDBLink: string;
}

interface Question {
  questionsRemainId: number;
  text: string;
}

interface ModalDialogMessage {
  message: string;
}

export type {
  Movie,
  SurveyOptions,
  SurveyProgress,
  Question,
  ModalDialogMessage,
};
