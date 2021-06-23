import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilNewSubjectComponent } from './accueil-new-subject/accueil-new-subject.component';
import { SujetDetailsComponent } from './sujet-details/sujet-details.component';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { FormModifierCompteComponent } from './form-modifier-compte/form-modifier-compte.component';
import { MessageService } from './services/messageService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';



const routes: Routes = [
  { path: 'accueil', component: AccueilNewSubjectComponent},
  { path: 'modifierCompte', component: FormModifierCompteComponent },
  { path: 'creationCompte', component: CreationFormComponent},
  // { path: '', component: AppComponent },
  // { path: 'not-found', component: NotFoundComponent},    ###TODO create not-found page
  { path: '**', redirectTo: 'accueil'},                    //###TODO reasign to not-found page when created
  { path: 'test', component: SujetDetailsComponent } 
]



@NgModule({
  declarations: [
    AppComponent,
    AccueilNewSubjectComponent,
    SujetDetailsComponent,
    CreationFormComponent,
    FormModifierCompteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
