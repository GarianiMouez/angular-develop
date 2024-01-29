import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section } from '../../../core/models/section';
import { SectionService } from '../../../core/services/sections.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../core/services/questions.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-section-form',
    templateUrl: './section-form.component.html',
    styleUrls: ['./section-form.component.scss'],
})
export class SectionFomrComponent implements OnInit {
    @Input('initialValues') initialValuesProps: any;
    @Output('sectionSubmit') sectionEvent = new EventEmitter<Section>();

    defaul_etat = 'Activée';
    form: FormGroup;

    questions = [];
    sections_questions = [];

    constructor(
        private fb: FormBuilder,
        private sectionService: SectionService,
        private questionService: QuestionService
    ) {}
    ngOnInit(): void {
        console.log(this.initialValuesProps);

        this.initializeValues();
    }

    // drop(event: CdkDragDrop<string[]>) {
    //     if (event.previousContainer === event.container) {
    //         moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //     } else {
    //         transferArrayItem(
    //             event.previousContainer.data,
    //             event.container.data,
    //             event.previousIndex,
    //             event.currentIndex
    //         );
    //     }
    // }
    drop(event: CdkDragDrop<string[]>) {
        const draggedItem = event.item.data;  
    
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
    
            this.emitUpdatedQuestions();
        }
    }
    
    private emitUpdatedQuestions() {
        const questionIds = this.sections_questions.map((item) => item.id);
    
        // this.sectionEvent.emit({ ...this.form.value, questionIds });
    }
    

    private initializeValues() {
        this.questions = this.questionService.getQuestions();

        this.form = this.fb.group({
            etat: new FormControl(
                this.initialValuesProps.etat != null ? this.initialValuesProps.etat : this.defaul_etat
            ),
            titre: new FormControl(this.initialValuesProps?.titre, {
                validators: [Validators.required, Validators.maxLength(60)],
            }),
            // type: new FormControl('', Validators.required),
            id: this.initialValuesProps?.id,
        });
    }

    save() {

        this.sectionEvent.emit(this.form.value);
    }
    
  
}
