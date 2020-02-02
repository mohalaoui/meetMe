import { InfoPerso } from './infoPerso';
import { Skills } from './skills';
import { Formation } from './formation';
import { Experience } from './experience';

export class Curriculum {
    constructor(
                public infoPerso:InfoPerso
                // public skills:Skills[],
                // public formations: Formation[],
                // public experiences: Experience[]
                ) {
    }
  }