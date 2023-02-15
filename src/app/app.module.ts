import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FinalAdComponent } from './components/final-ad/final-ad.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProgressComponent } from './components/progress/progress.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FinalAdComponent,
    HeaderComponent,
    FooterComponent,
    MoviesComponent,
    ProgressComponent,
    ModalDialogComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
