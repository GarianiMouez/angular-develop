import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'header-user-profile  ',
    template: `
        <span class="fill-remaining-space ">
            <button mat-icon-button [matMenuTriggerFor]="menu" (click)="(false)">
                <div id="profileImage" class="profile-img"></div>

                <!--     <img
                    class="profile-img"
                    src="https://fastly.picsum.photos/id/737/200/200.jpg?hmac=YPktyFzukhcmeW3VgULbam5iZTWOMXfwf6WIBPpJD50"
                /> -->
            </button>
            <mat-menu class=" mr-2  mt-2" #menu="matMenu" [overlapTrigger]="false">
                <mat-card class="">
                    <mat-card-subtitle class=" text-white text-center ">
                        {{ 'initialValuesProps?.company.name' }}
                    </mat-card-subtitle>
                    <mat-card-content>
                        <div id="profileImage2" class="user-profile-img"></div>
                        <br />
                        <p class="text-center text-dark">{{ initialValuesProps?.nom }}</p>
                    </mat-card-content>
                    <mat-divider></mat-divider>
                    <button class="text-center  text-dark " mat-menu-item>
                        <span>{{ 'APP.NAVBAR.DROPDOWN.PROFILE' | translate }}</span>
                    </button>

                    <mat-divider></mat-divider>

                    <button class="  text-center text-danger" mat-menu-item (click)="logout()">
                        <span>{{ 'APP.NAVBAR.DROPDOWN.LOGOUT' | translate }}</span>
                    </button>
                </mat-card>
            </mat-menu>
        </span>
    `,
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnChanges {
    @Input('initializeValues') initialValuesProps: any;
    image_url: any;

    constructor() {}
    ngOnInit(): void {
        let image = this.setImageUrl(
            !!this.initialValuesProps?.email ? this.initialValuesProps?.email : 'Admin@Admin.com'
        );
        document.getElementById('profileImage').innerHTML = image;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.initialValuesProps?.currentValue.email != null) {
            let image = this.setImageUrl(
                !!this.initialValuesProps?.email ? this.initialValuesProps?.email : 'Admin@Admin.com'
            );
            document.getElementById('profileImage').innerHTML = image;
        }
    }

    logout() {}

    private setImageUrl(userName: string) {
        if (userName) {
            const intials =
                userName.substring(0, userName.indexOf('@')).charAt(0).toUpperCase() +
                userName.substring(0, userName.indexOf('@')).charAt(1).toUpperCase() +
                userName.substring(0, userName.indexOf('@')).charAt(2).toUpperCase();
            return intials;
        }
    }
}
