import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormModifierCompteComponent } from './form-modifier-compte/form-modifier-compte.component';
import { MessageService } from './services/messageService';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: '', component: AppComponent },
  {path:'ModifierCompte', component: FormModifierCompteComponent},
  // { path: 'not-found', component: NotFoundComponent},    ###TODO create not-found page
  { path: '**', redirectTo: ''}                    //###TODO reasign to not-found page when created
]



@NgModule({
  declarations: [
    AppComponent,
    FormModifierCompteComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule, 
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
