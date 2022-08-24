import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { UserFormComponent } from './components/form-components/user-form/user-form.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';
import { PageNotFoundComponent } from './components/error404page/pageNotFound.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    TableWrapperComponent,
    PageNotFoundComponent,
    UsersTableComponent,
    UserFormComponent,
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
