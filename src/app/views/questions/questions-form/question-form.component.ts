import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../core/services/questions.service';
import { IQuestionType, Question } from '../../../core/models/question';
import { lineAddEditButton } from '../../../shared/line-actions/add-edit-button/add-edit-button.component';

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
    @Input('initialValues') initialValuesProps: any;
    @Output('questionSubmit') questionEvent = new EventEmitter<Question>();

    defaul_etat = 'Activée';

    form: FormGroup;
    question_type = ['TEXT', 'LONGTEXT', 'DATE', 'CHECKBOX', 'LIST', 'RADIO', 'SPINNER', 'STARS'];

    constructor(private fb: FormBuilder, private questionService: QuestionService) {}
    ngOnInit(): void {
        console.log(this.initialValuesProps);

        this.initializeValues();
    }

    private initializeValues() {
        this.form = this.fb.group({
            etat: new FormControl(
                this.initialValuesProps.etat != null ? this.initialValuesProps.etat : this.defaul_etat
            ),
            name: new FormControl(this.initialValuesProps?.name, {
                validators: [Validators.required, Validators.maxLength(60)],
            }),
            type: new FormControl(this.initialValuesProps?.type, Validators.required),
            id: this.initialValuesProps?.id,
        });
    }

    save() {
        
        this.questionEvent.emit(this.form.value);
    }
}
