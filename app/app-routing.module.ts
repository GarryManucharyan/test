import { UserFormComponent } from './components/form-components/user-form/user-form.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';
import { PageNotFoundComponent } from './components/error404page/pageNotFound.component';
import { RouterModule, Routes } from '@angular/router';
import { AddUserGuard } from './guards/add-user.guard';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: "users", component: TableWrapperComponent, pathMatch: "full" },
  { path: "users/view/:id", component: UserFormComponent, data: { mode: 'view' } },
  { path: "users/edit/:id", component: UserFormComponent, data: { mode: 'edit' } },
  { path: "users/create", component: UserFormComponent, data: { mode: 'create' }, canActivate: [AddUserGuard] },
  { path: "**", component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AddUserGuard]
})
export class AppRoutingModule { }
