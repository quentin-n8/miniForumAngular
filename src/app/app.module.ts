import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

const routes: Routes = [
  { path: 'mainMenu', component: MainMenuComponent},
  { path: '', component: AppComponent },
  // { path: 'not-found', component: NotFoundComponent},    ###TODO create not-found page
  { path: '**', redirectTo: 'mainMenu'}                    //###TODO reasign to not-found page when created
]



@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
