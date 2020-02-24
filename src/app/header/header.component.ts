import { Component, OnInit } from '@angular/core';
import { Curriculum } from '../models/curriculum';
import { Subscription } from 'rxjs';
import { CurriculumService } from '../services/curriculum.service';
import { Router } from '@angular/router';
import { TargetLocator } from 'selenium-webdriver';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  curriculums : Curriculum[];
  curriculum : Curriculum;
  curriculumsSubscription: Subscription;

  constructor(private curriculumService : CurriculumService, private router : Router) { }
  
  ngOnInit() {
    this.curriculumsSubscription = this.curriculumService.curriculumsSubject.subscribe(
      (curriculums : Curriculum[]) => {
        this.curriculums = curriculums;
      }
    );
    this.curriculumService.emitCurriculum();

    this.curriculumService.getOneCurriculum("0").then(
      (data: Curriculum) =>{
        this.curriculum = data;
      },
      (error) =>{
        console.log(error);
      }
      )
  }
  
  onNewCurriculum(){
    this.router.navigate(['/new']);
  }


  ngOnDestroy(): void {
    this.curriculumsSubscription.unsubscribe();
  }


}
