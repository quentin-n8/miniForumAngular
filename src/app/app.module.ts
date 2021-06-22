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


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: "createUserForm", component: CreationFormComponent },
  {path:'ModifierCompte', component: FormModifierCompteComponent},
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
    RouterModule.forRoot(routes)
  ],
  providers: [MessageService, UsersService],

  bootstrap: [AppComponent]
})

export class AppModule { }
