import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from "../../state/project.state";
import {ProjectService} from "../../services/project.service";
import { Project } from 'src/app/models/project.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project$:Observable<AppDataState<Project[]>> | null | undefined
  readonly DataStateEnum = DataStateEnum;

  constructor(private projectService:ProjectService,private router:Router) { }

  ngOnInit(): void {
  }
  onGetAllProjects() {
    this.project$ = this.projectService.getAllProject().pipe(
      map(data =>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data});
      }),
      startWith({
        dataState:DataStateEnum.LOADING
      }),
      catchError(err =>of({
       dataState:DataStateEnum.ERROR,errorMessage:err.message
      }))
    );
  }
  onDelete(p:Project){
    let v = confirm("Are you sure you want to delete this project?")
    if(v ==true) {
      this.projectService.deleteProject(p)
      .subscribe(data=>{
        this.onGetAllProjects();
      })
    }
  }
  onSearch(dataForm:any){
    this.project$ = this.projectService.searchProject(dataForm.keyword)
    .pipe(map(data=>{
      console.log(data);
      return ({
        dataState:DataStateEnum.LOADED,data:data
      })
    }),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err => 
      of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
     )
    );
  }
  onNewProject(){
    this.router.navigateByUrl("/newProject");
  }
  editProject(project:Project){
    this.router.navigateByUrl("/editProject"+project.id);
  }
}
