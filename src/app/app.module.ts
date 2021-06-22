import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilNewSubjectComponent } from './accueil-new-subject/accueil-new-subject.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'accueil', component: AccueilNewSubjectComponent},
  { path: '', component: AppComponent},
  // { path: 'not-found', component: NotFoundComponent},    ###TODO create not-found page
  { path: '**', redirectTo: ''}                    //###TODO reasign to not-found page when created
]



@NgModule({
  declarations: [
    AppComponent,
    AccueilNewSubjectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
