import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs'
import {Project} from '../models/project.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    keyword:String | undefined;
  constructor(private http:HttpClient) { }

  getAllProject():Observable<Project[]>{
    let host = environment.host;
    return this.http.get<Project[]>(host+"/projects");
  }
  getProjectById(id:string):Observable<Project[]>{
    let host = environment.host;
  return this.http.get<Project[]>(host+"/projects"+id);
  }
  searchProject(keyword:string):Observable<Project[]>{
    let host=environment.host;
    return this.http.get<Project[]>(host+"/products?name_like="+keyword);
  }
  deleteProject(project:Project):Observable<void>{
    let host = environment.host;
    return this.http.delete<void>(host+"/projects"+project.id)
  }
  updateProject(project:Project):Observable<Project>{
    let host = environment.host;
    return this.http.put<Project>(host+"/projects",project)
  }
  save(project:Project):Observable<Project>{
    let host=environment.host;
    return this.http.post<Project>(host+"/products",project);
  }
}
