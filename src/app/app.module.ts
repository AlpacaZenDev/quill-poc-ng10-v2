import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    QuillModule.forRoot()  // Sin configuración personalizada, usar todo por defecto
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }