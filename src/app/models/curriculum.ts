import { InfoPerso } from './infoPerso';
import { Skills } from './skills';
import { Formation } from './formation';
import { Experience } from './experience';

export class Curriculum {
    constructor(
                public nom:string, 
                public prenom:string, 
                public titre:string,
                public infoPerso:InfoPerso
                // public skills:Skills[],
                // public formations: Formation[],
                // public experiences: Experience[]
                ) {
    }
  }