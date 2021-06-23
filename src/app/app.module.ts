import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormModifierCompteComponent } from './form-modifier-compte/form-modifier-compte.component';
import { MessageService } from './services/messageService';
import { HttpClientModule } from '@angular/common/http';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { UsersService } from './services/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: "createUserForm", component: CreationFormComponent },
  { path:'modifierCompte', component: FormModifierCompteComponent},
  // { path: 'not-found', component: NotFoundComponent},    ###TODO create not-found page
  { path: '**', redirectTo: ''}                    //###TODO reasign to not-found page when created
]



@NgModule({
  declarations: [
    AppComponent,
    FormModifierCompteComponent,
    CreationFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [MessageService, UsersService],

  bootstrap: [AppComponent]
})

export class AppModule { }
