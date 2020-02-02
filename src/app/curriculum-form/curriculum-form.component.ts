import { Component, OnInit } from '@angular/core';
import { Curriculum } from '../models/curriculum';
import { Subscription } from 'rxjs';
import { CurriculumService } from '../services/curriculum.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfoPerso } from '../models/infoPerso';

@Component({
  selector: 'app-curriculum-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.css']
})
export class CurriculumFormComponent implements OnInit {

  curriculumForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private curriculumService: CurriculumService,
              private router: Router) { }
  
              
  
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.curriculumForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      homeTitre: ['', Validators.required],
      aboutTitre: ['', Validators.required],
      aboutDesc: ['', Validators.required],
      age: ['', Validators.required],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      freelance: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }

  onSaveCurriculum() {
    //home
    const nom = this.curriculumForm.get('nom').value;
    const prenom = this.curriculumForm.get('prenom').value;
    const homeTitre = this.curriculumForm.get('homeTitre').value;
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

    const newInfoPerso = new InfoPerso(infoPersoTitre, infoPersoDesc, nom, prenom, infoPersoExp, age, pays, ville, email, tel, freelance);
    const newCurriculum = new Curriculum(nom, prenom, homeTitre, newInfoPerso);
    
    this.curriculumService.createCurriculum(newCurriculum);
    this.router.navigate(['/home']);
  }

}
