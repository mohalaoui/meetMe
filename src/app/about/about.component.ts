import { Component, OnInit, OnDestroy } from '@angular/core';
import { Curriculum } from '../models/curriculum';
import { Subscription } from 'rxjs';
import { CurriculumService } from '../services/curriculum.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  curriculums: Curriculum[];
  curriculum: Curriculum = null;
  curriculumsSubscription: Subscription;

  constructor(private curriculumService: CurriculumService) { }

  ngOnInit() {
    this.curriculumsSubscription = this.curriculumService.curriculumsSubject.subscribe(
      (curriculums: Curriculum[]) => {
        //test observable
        this.curriculum = curriculums[0];
      },
      (error) => {
        console.log(error);
      }
    );
    this.curriculumService.emitCurriculum();


    //test promise
    // this.curriculumService.getOneCurriculum('0').then(
    //   (data: Curriculum) => {
    //     this.curriculum = data;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  onDownloadResume() {

  }


  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.curriculumsSubscription.unsubscribe();
  }



}
