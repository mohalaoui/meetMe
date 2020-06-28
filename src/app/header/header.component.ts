import { Component, OnInit } from '@angular/core';
import { Curriculum } from '../models/curriculum';
import { Subscription } from 'rxjs';
import { CurriculumService } from '../services/curriculum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  curriculums: Curriculum[];
  curriculum: Curriculum;
  curriculumsSubscription: Subscription;

  constructor(private curriculumService: CurriculumService, private router: Router) { }

  ngOnInit() {
    this.curriculumsSubscription = this.curriculumService.curriculumsSubject.subscribe(
      (curriculums: Curriculum[]) => {
        // test observable
        this.curriculum = curriculums[0];
      }
    );
    this.curriculumService.emitCurriculum();


    // test promise
    // this.curriculumService.getOneCurriculum("0").then(
    //   (data: Curriculum) => {
    //     this.curriculum = data;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }

  onNewCurriculum() {
    this.router.navigate(['/update']);
  }


  ngOnDestroy(): void {
    this.curriculumsSubscription.unsubscribe();
  }


}
