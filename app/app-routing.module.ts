import { UserFormComponent } from './components/form-components/user-form/user-form.component';
import { PageNotFoundComponent } from './components/error404page/pageNotFound.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: "", component: WrapperComponent, pathMatch: "full" },
  { path: "view/:id", component: UserFormComponent, data: { mode: 'view' } },
  { path: "edit/:id", component: UserFormComponent, data: { mode: 'edit' } },
  { path: "create", component: UserFormComponent, data: { mode: 'create' } },
  { path: "**", component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
