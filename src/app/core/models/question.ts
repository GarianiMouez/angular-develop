export const enum IQuestionType {
    TEXT = 'TEXT',
    LONGTEXT = 'LONGTEXT',
    DATE = 'DATE',
    CHECKBOX = 'CHECKBOX',
    LIST = 'LIST',
    RADIO = 'RADIO',
    SPINNER = 'SPINNER',
    STARS = 'STARS',
}
export function getQuestionColumns() {
    return ['name', 'type', 'etat', 'actions'];
}

export function getQuestionStatus() {
    return ['Activée', 'Desactivée'];
}

export class Question {
    constructor(public id?: number, public name?: string, public etat?: string, public type?: IQuestionType) {}
}
