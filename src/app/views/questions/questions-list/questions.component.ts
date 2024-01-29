import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Question, getQuestionColumns, getQuestionStatus } from 'src/app/core/models/question';
import { lineAddEditButton } from 'src/app/shared/line-actions/add-edit-button/add-edit-button.component';
import { QuestionService } from '../../../core/services/questions.service';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionComponent implements OnInit, AfterViewInit {
    @ViewChild('add_modal') lineAdd: lineAddEditButton;
    @ViewChild('edit_modal') lineEdit: lineAddEditButton;

    @ViewChildren('edit_modal')
    private edit_modals: QueryList<lineAddEditButton>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    questionColumns = getQuestionColumns();
    questionStatus = getQuestionStatus();

    constructor(private questionService: QuestionService) {}

    questions: any = [];
    ngOnInit(): void {
        this.questions = new MatTableDataSource<Question>(this.questionService.getQuestions());
        this.questions.paginator = this.paginator;
        this.questions.sort = this.sort;
    }

    ngAfterViewInit(): void {
        if (this.questions.data.length > 0) {
            this.questions.paginator = this.paginator;
            this.questions.sort = this.sort;
        }
    }

    save(question: Question) {
        
        if (!!!question.id) {
            this.questionService.createQuestion(question);

            this.questions = new MatTableDataSource<Question>(this.questionService.getQuestions());

            this.modalEditHide(question);
        } else {
            this.questionService.updateQuestion(question);
            this.questions = new MatTableDataSource<Question>(this.questionService.getQuestions());

            this.modalEditHide(question);
        }
    }

    onDeleteQuestion(question: Question) {
        this.questionService.deleteQuestion(question);
        this.questions = new MatTableDataSource<Question>(this.questionService.getQuestions());
    }

    modalEditHide(data) {
      console.log("data");
      console.log(data);

        if (this.lineAdd.editModal.isShown) {
            this.lineAdd.modalEditHide();
        } else {
            this.edit_modals.forEach((x) => {
                if (x.data['id'] === data['id']) {
                    x.modalEditHide();
                }
            });
        }
    }
}
