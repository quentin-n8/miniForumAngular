import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { UsersService } from './services/users.service';

const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: "createUserForm", component: CreationFormComponent },
  // { path: 'not-found', component: NotFoundComponent},    ###TODO create not-found page
  { path: '**', redirectTo: ''}                    //###TODO reasign to not-found page when created
]



@NgModule({
  declarations: [AppComponent, CreationFormComponent],
  imports: [HttpClientModule, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [UsersService],
  bootstrap: [AppComponent]
})

export class AppModule { }
