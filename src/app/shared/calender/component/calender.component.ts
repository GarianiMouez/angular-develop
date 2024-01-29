import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    CalendarDateFormatter,
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarMonthViewDay,
    CalendarView,
} from 'angular-calendar';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { IRoles } from '../../../core/interfaces/IRoles';
import { formatCustomTime } from '../../utlis/globalfunction';
import { CustomDateFormatter } from './custom-date-formatter.provider';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Component({
    selector: 'app-calender',
    templateUrl: './calender.component.html',
    styleUrls: ['./calender.component.scss'],
    providers: [
        {
            provide: CalendarDateFormatter,
            /*             useClass: CustomDateFormatter,
             */
        },
    ],
})
export class CalenderComponent implements OnInit, OnChanges {
    colors = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3',
        },
        blue: {
            primary: 'rgb(181 213 243)',
            secondary: 'rgb(181 213 243)',
        },
        yellow: {
            primary: 'rgb(200 243 94)',
            secondary: 'rgb(200 243 94)',
        },
    };

    private yesterday: Date;
    locale: string = 'fr';

    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    @Input('data') data;
    @Input('role') role: IRoles;
    @Input('formTemplate') formTemplate: TemplateRef<any>;

    show_calender_form = true;
    @Output('sendData') sendDataEvent = new EventEmitter<any>();
    @Output('dayClicked') sendDayClickedEvent = new EventEmitter<any>();

    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    events: CalendarEvent[];
    activeDayIsOpen: boolean;

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    constructor(private dialog: MatDialog) {}
    ngOnChanges(changes: SimpleChanges): void {
        this.initializeValues();
    }
    ngOnInit(): void {
        this.initializeYesterday();
    }

    private initializeYesterday() {
        this.yesterday = new Date();
        this.yesterday.setDate(this.yesterday.getDate());
    }

    menuClicked() {
        this.show_calender_form = !this.show_calender_form;
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
 /*        if (this.checkExistItem(date)) {
            this.sendDayClickedEvent.emit({ end_date: date, start_date: date });
        }
 */
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    private checkExistItem(date) {
        return this.events.findIndex((a) => {
            return a.start?.toDateString() === date?.toDateString() ? true : false;
        });
    }

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        /*         this.handleEvent('Dropped or resized', event);
         */
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.yellow,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    dateIsValid(date: Date): boolean {
        return date.getTime() < new Date().getTime();
    }

    applyDateSelectionPolicy({ body }: { body: CalendarMonthViewDay[] }): void {
        body.forEach((day) => {
            if (formatCustomTime(day.date) === 'Sat' || formatCustomTime(day.date) === 'Sun') {
                day.cssClass = 'disabled-date';
            }
        });
    }

    private initializeValues() {
        if (this.data?.length > 0) {
            let tempArray = this.data.map((item) => {
                let event;
                switch (item?.type) {
                    case 'old':
                        event = {
                            ...item,
                            actions: [
                                {
                                    label: '<i class="fa fa-fw fa-pencil"></i>',
                                    cssClass: 'text-warning',
                                    onClick: (): void => {
                                        this.handleEvent('old_edit', { date: item?.start });
                                    },
                                },
                                {
                                    label: '<i class="fa fa-fw fa-trash"></i>',
                                    cssClass: 'text-danger',
                                    onClick: (): void => {
                                        this.handleEvent('old_delete', { date: item?.start });
                                    },
                                },
                            ],
                            color: this.colors.yellow,
                        };

                        return event;
                    case 'new':
                        event = {
                            ...item,
                            actions: [
                                {
                                    label: ' &nbsp; <i class="fa fa-fw fa-plus"></i>',
                                    cssClass: 'text-info',
                                    onClick: (): void => {
                                        this.handleEvent('new', { date: item?.start });
                                    },
                                },
                            ],
                            color: this.colors.blue,
                        };

                        return event;

                    default:
                        return event;
                }
            });

            this.events = tempArray;
        } else {
            this.events = this.data;
        }
    }

    handleEvent(event, data) {
        this.sendDataEvent.emit({ event, ...data });
    }
}
