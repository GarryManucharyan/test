import { UserFormComponent } from './components/form-components/user-form/user-form.component';
import { PageNotFoundComponent } from './components/error404page/pageNotFound.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: "", component: UsersTableComponent, pathMatch: "full" },
  { path: "view/:id", component: UserFormComponent },
  { path: "edit/:id", component: UserFormComponent },
  { path: "create", component: UserFormComponent },
  { path: "**", component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
