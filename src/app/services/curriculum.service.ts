import { Injectable } from '@angular/core';
import { Curriculum } from '../models/curriculum';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  curriculums: Curriculum[] = [];
  curriculumsSubject = new Subject<Curriculum[]>();

  constructor() {
    this.getAllCurriculums();
  }

  emitCurriculum() {
    this.curriculumsSubject.next(this.curriculums);
  }

  saveCurriculum() {
    firebase.database().ref('/curriculum').set(this.curriculums);
  }

  updateCurriculum(id: string, curriculum: Curriculum) {
    firebase.database().ref('/curriculum/' + id).update(curriculum);
  }

  getAllCurriculums() {
    firebase.database().ref('/curriculum').on(
      'value', (data: firebase.database.DataSnapshot) => {
        this.curriculums = data.val() ? data.val() : [];
        this.emitCurriculum();
      }
    );
  }

  getOneCurriculum(id: string) {
    return new Promise<Curriculum>(
      (resolve, reject) => {
        firebase.database().ref('/curriculum/' + id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createCurriculum(newCurriculum: Curriculum) {
    this.curriculums.push(newCurriculum);
    this.saveCurriculum();
    this.emitCurriculum();
  }

  removeCurriculum(curriculum: Curriculum) {
    const curriculumIndexToRemove = this.curriculums.findIndex(
      (curriculumEl) => {
        if (curriculumEl === curriculum) {
          return true;
        }
      }
    );
    this.curriculums.splice(curriculumIndexToRemove, 1);
    this.saveCurriculum();
    this.emitCurriculum();
  }

}
