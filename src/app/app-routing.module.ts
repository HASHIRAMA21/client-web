import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  {path:"new-project",component:NewProjectComponent},
  {path:"login",component:LoginComponent},
  {path:"newproject",component:NewProjectComponent},
  {path:"project",component:ProjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
