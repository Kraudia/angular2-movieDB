import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';

const appRoutes: Routes = [
  {
    path: 'filmy',
    component: MoviesComponent,
    data: { title: 'Allegro' }
  },
  { path: '',
    redirectTo: '/filmy',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
