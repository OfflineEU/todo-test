import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ModalDirective } from './directives/modal.directive';
import { ButtonStyleDirective } from './directives/button-style.directive';
import { FormStyleDirective } from './directives/form-style.directive';
import {ModalCloseDirective} from './directives/modal-close.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    BoardsPageComponent,
    ModalDirective,
    ButtonStyleDirective,
    FormStyleDirective,
    ModalCloseDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
