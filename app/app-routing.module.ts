import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './components/form-components/user-form/user-form.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

const appRoutes: Routes = [
  { path: "", component: UsersTableComponent, pathMatch: "full" },
  { path: "view/:id", component: UserFormComponent },
  { path: "edit/:id", component: UserFormComponent },
  { path: "create", component: UserFormComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
