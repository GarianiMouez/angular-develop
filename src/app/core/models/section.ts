export function getSectionColumns() {
    return ['titre', 'etat', 'nb_questions', 'actions'];
}

export function getSectionStatus() {
    return ['Activée', 'Desactivée'];
}

export class Section {
    constructor(public id?: number, public titre?: string, public etat?: string ) {}
}
