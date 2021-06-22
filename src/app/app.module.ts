import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SujetDetailsComponent } from './sujet-details/sujet-details.component';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { FormModifierCompteComponent } from './form-modifier-compte/form-modifier-compte.component';
import { MessageService } from './services/messageService';


const routes: Routes = [
  { path: '', component: AppComponent },
  {path:'ModifierCompte', component: FormModifierCompteComponent},
  // { path: 'not-found', component: NotFoundComponent},    ###TODO create not-found page
  { path: '**', redirectTo: ''},                    //###TODO reasign to not-found page when created
  { path: 'test', component: SujetDetailsComponent } 
]



@NgModule({
  declarations: [
    AppComponent,
    SujetDetailsComponent,
    CreationFormComponent,
    FormModifierCompteComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
