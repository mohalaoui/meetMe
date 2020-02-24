import { Component, OnInit } from '@angular/core';
import { Curriculum } from '../models/curriculum';
import { Subscription } from 'rxjs';
import { CurriculumService } from '../services/curriculum.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfoPerso } from '../models/infoPerso';
import { Experience } from '../models/experience';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-curriculum-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.css']
})
export class CurriculumFormComponent implements OnInit {

  curriculumForm: FormGroup;
  resumeForm: FormGroup;
  //resumeExperience: Experience[] = [];
  curriculum : Curriculum;

  constructor(private formBuilder: FormBuilder, private curriculumService: CurriculumService,
              private router: Router) { }
  
  
  ngOnInit() {
    this.initForm();
    this.loadCurriculumInput();
    
  }

  loadCurriculumInput(){
    this.curriculumService.getOneCurriculum("0").then(
      (data: Curriculum) =>{
        this.curriculum = data;
        //home
        this.curriculumForm.get('nom').setValue(this.curriculum.infoPerso.nom);
        const prenom = this.curriculumForm.get('prenom').setValue(this.curriculum.infoPerso.prenom);
        //info perso
        this.curriculumForm.get('aboutTitre').setValue(this.curriculum.infoPerso.titre);
        this.curriculumForm.get('aboutDesc').setValue(this.curriculum.infoPerso.desc);
        this.curriculumForm.get('age').setValue(this.curriculum.infoPerso.age);
        this.curriculumForm.get('pays').setValue(this.curriculum.infoPerso.pays);
        this.curriculumForm.get('ville').setValue(this.curriculum.infoPerso.ville);
        this.curriculumForm.get('email').setValue(this.curriculum.infoPerso.email);
        this.curriculumForm.get('tel').setValue(this.curriculum.infoPerso.tel);
        this.curriculumForm.get('freelance').setValue(this.curriculum.infoPerso.freelance);
        this.curriculumForm.get('experience').setValue(this.curriculum.infoPerso.experience);

        //Array.prototype.push.apply(this.resumeExperience, this.curriculum.infoPerso.resumes);
        
        // this.curriculum.infoPerso.resumes.forEach(
        //   (experience:Experience) =>{

        //     this.resumeForm.get('resumeType').setValue;
        //     this.resumeForm.get('resumeTitre').setValue;
        //     this.resumeForm.get('dateDebut').setValue;
        //     this.resumeForm.get('dateFin').setValue;
        //     this.resumeForm.get('resumeDesc').setValue;
        //   }
        // )
      },
      (error) =>{
        console.log(error);
      }
      )
  }
  
  initForm() {
    this.curriculumForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      aboutTitre: ['', Validators.required],
      aboutDesc: ['', Validators.required],
      age: ['', Validators.required],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      freelance: ['', Validators.required],
      experience: ['', Validators.required]
    });
    this.resumeForm = this.formBuilder.group({
      resumeTitre: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      resumeDesc: ['', Validators.required],
      resumeType: ['', Validators.required]
    });
  }

  onSaveCurriculum() {
    //home
    const nom = this.curriculumForm.get('nom').value;
    const prenom = this.curriculumForm.get('prenom').value;
    //info perso
    const infoPersoTitre = this.curriculumForm.get('aboutTitre').value;
    const infoPersoDesc = this.curriculumForm.get('aboutDesc').value;
    const age = this.curriculumForm.get('age').value;
    const pays = this.curriculumForm.get('pays').value;
    const ville = this.curriculumForm.get('ville').value;
    const email = this.curriculumForm.get('email').value;
    const tel = this.curriculumForm.get('tel').value;
    const freelance = this.curriculumForm.get('freelance').value;
    const infoPersoExp = this.curriculumForm.get('experience').value;

    let resume: Experience[] = [];
    if(this.curriculum.infoPerso.resumes.length > 0){
      resume.push(...this.curriculum.infoPerso.resumes)
    }
    else{
      resume = null;
    }

    const newInfoPerso = new InfoPerso(infoPersoTitre, infoPersoDesc, nom, prenom, infoPersoExp, age, pays, ville, email, tel, freelance, resume);
    const newCurriculum = new Curriculum(newInfoPerso);
    this.curriculumService.getOneCurriculum("0").then(
      (response) =>{
        this.curriculumService.updateCurriculum("0", newCurriculum);
      },
      (error) =>{
        if (error.status === 404) {
          this.curriculumService.createCurriculum(newCurriculum);
        }
      }
    )
    this.router.navigate(['/home']);
  }

  onAddResume(){
    const resumeType = this.resumeForm.get('resumeType').value;
    const resumeTitre = this.resumeForm.get('resumeTitre').value;
    const dateDebut = this.resumeForm.get('dateDebut').value;
    const dateFin = this.resumeForm.get('dateFin').value;
    const resumeDesc = this.resumeForm.get('resumeDesc').value;

    const newExperience = new Experience(uuidv4(), resumeType, resumeTitre, dateDebut, dateFin, resumeDesc);
    
    if(this.curriculum.infoPerso.resumes == null){
      this.curriculum.infoPerso.resumes = []
    }
    this.curriculum.infoPerso.resumes.push(newExperience);
  }

  onResumeDelete(id:number){
    const resumeIndexToRemove = this.curriculum.infoPerso.resumes.findIndex(
      (experience) => {
        if(experience.id === id) {
          return true;
        }
      }
    );
    this.curriculum.infoPerso.resumes.splice(resumeIndexToRemove, 1);
    
  }
}
