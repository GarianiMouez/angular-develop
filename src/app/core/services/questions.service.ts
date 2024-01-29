import { Injectable } from '@angular/core';
import { questions } from './data';
import { Question } from '../models/question';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    temp_questions = [...questions];
    constructor() {}

    createQuestion(question: Question) {
        let id = Math.floor(Math.random() * 6) + 1;

        let temp_question = {
            id: id,
            name: question.name,
            type: question.type,
            etat: question.etat,
        };
        this.temp_questions.push({ ...temp_question });
    }

    updateQuestion(question: Question) {
        var foundIndex = this.temp_questions.findIndex((x) => x.id == question.id);

        this.temp_questions[foundIndex] = question;
    }

    deleteQuestion(question: Question) {
        const newArr = this.temp_questions.filter((object) => {
            return object.id !== question.id;
        });

        this.temp_questions = newArr;
    }

 
    getQuestions(): Question[] {
        return this.temp_questions;
    }
}
