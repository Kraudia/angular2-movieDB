import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesService } from './movies/movies.service';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: 'filmy', component: MoviesComponent },
  { path: '', redirectTo: '/filmy', pathMatch: 'full' },
  { path: '**', redirectTo: '/filmy' }
];

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
