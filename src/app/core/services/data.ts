import { IQuestionType, Question } from '../models/question';
import { QuestionSection } from '../models/question_section';
import { Section } from '../models/section';

export const sections: Section[] = [
    { id: 1, titre: 'section 1 ', etat: 'Activée' },
    { id:3, titre: 'section 3 ', etat: 'Activée' },
];
export const questions: Question[] = [
    { id: 1, name: 'question 1', type: IQuestionType.TEXT, etat: 'Activée' },
    { id: 2, name: 'question 2', type: IQuestionType.DATE, etat: 'Activée' },
    { id: 3, name: 'question 3', type: IQuestionType.CHECKBOX, etat: 'Desactivée' },
];
export const question_section: QuestionSection[] = [
    /*     { id: 1, questionId: 1, sectionId: 1 },
    { id: 2, questionId: 2, sectionId: 1 }, */
];
