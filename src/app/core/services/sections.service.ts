import { Injectable } from '@angular/core';
import { question_section, sections } from './data';
import { Section } from '../models/section';

@Injectable({
    providedIn: 'root',
})
export class SectionService {
    temp_sections = [...sections];
    temp_question_section = [...question_section];

    constructor() {}

    createSection(section: Section) {
        let id = Math.floor(Math.random() * 6) + 1;

        let temp_section = {
            id: id,
            titre: section.titre,
            etat: section.etat,
           };
        this.temp_sections.push({ ...temp_section });
    }

    updateSection(section: Section) {
        var foundIndex = this.temp_sections.findIndex((x) => x.id == section.id);

        this.temp_sections[foundIndex] = section;
    }

    deleteSection(section: Section) {
        const newArr = this.temp_sections.filter((object) => {
            return object.id !== section.id;
        });

        this.temp_sections = newArr;
    }

      affecterQuestion(question_id, section_id) {
        const section = this.temp_sections.find((s) => s.id === section_id);

        if (section) {
            const existeDeja = this.temp_question_section.some(
                (qs) => qs.sectionId === section_id && qs.questionId === question_id
            );

            if (!existeDeja) {
                // Ajouter l'association à temp_question_section
                this.temp_question_section.push({ sectionId:section_id, questionId:question_id });
            }
        } else {
            console.error('Section non trouvée');
        }
    }


    getSections() {
        return this.temp_sections;
    }

    getQuestionSection(){
        return this.temp_question_section
    }
    // Vous pouvez ajouter d'autres méthodes spécifiques aux sections ici, si nécessaire
}
