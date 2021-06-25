import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilNewSubjectComponent } from './accueil-new-subject/accueil-new-subject.component';
import { FormModifierCompteComponent } from './form-modifier-compte/form-modifier-compte.component';
import { SujetDetailsComponent } from './sujet-details/sujet-details.component';
import { MessageService } from './services/messageService';
import { HttpClientModule } from '@angular/common/http';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { UsersService } from './services/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { SujetsService } from './services/sujetsService';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConnexionComponent } from './connexion/connexion.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ModifierCompteGuard } from "./guards/modifier-compte.guard"; 



const routes: Routes = [
  { path: 'accueil', component: AccueilNewSubjectComponent},
  { path: 'modifierCompte', canActivate: [ModifierCompteGuard], component: FormModifierCompteComponent },
  { path: 'creationCompte', component: CreationFormComponent},
  { path: "sujetDetails/:id", component: SujetDetailsComponent },
  { path: "connexion", component: ConnexionComponent },
  
  // { path: '', component: AppComponent },
  // { path: 'not-found', component: NotFoundComponent},    ###TODO create not-found page
  { path: '**', redirectTo: 'accueil'},
]



@NgModule({
  declarations: [
    AppComponent,
    AccueilNewSubjectComponent,
    SujetDetailsComponent,
    CreationFormComponent,
    FormModifierCompteComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    RouterModule.forRoot(routes),
    MatSliderModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSlideToggleModule,
  ],
  providers: [
    MessageService,
    UsersService,
    SujetsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
