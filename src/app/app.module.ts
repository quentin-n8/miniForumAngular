import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FormModifierCompteComponent } from './form-modifier-compte/form-modifier-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    FormModifierCompteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
