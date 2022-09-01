import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { UserFormComponent } from './components/form-components/user-form/user-form.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';
import { PageNotFoundComponent } from './components/error404page/pageNotFound.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AppComponent } from './app.component';

import { ColoryDirective } from './directives/colory.directive';

@NgModule({
  declarations: [
    TableWrapperComponent,
    PageNotFoundComponent,
    UsersTableComponent,
    PaginatorComponent,
    UserFormComponent,
    ColoryDirective,
    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
