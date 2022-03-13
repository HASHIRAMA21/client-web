import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
    
  projectId?:number;
  projectFormGroup:FormGroup | undefined;
  submitted:boolean=false;

  constructor(private activatedRoute:ActivatedRoute,
    private projectService:ProjectService,private fb:FormBuilder) {
      this.projectId=activatedRoute.snapshot.params['id'];
     }

  ngOnInit(): void {
    this.projectFormGroup = this.fb.group({
      name:["",Validators.required],
      description:["",Validators.required]
    })
  }
  onSaveProject(){
    this.submitted = true;
    if(this.projectFormGroup?.invalid)return;
    this.projectService.save(this.projectFormGroup?.value)
    .subscribe(data=>{
      alert("Project saved successfully")
    });
  }
}
