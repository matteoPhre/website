import { Component, OnInit } from '@angular/core';

declare var callScramblerAnimation: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss', './home.component.responsive.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
    ) { }

    animateOnHover(phraseList: any, querySelector: any, scrambleChars: any) {
        new callScramblerAnimation(phraseList, querySelector, scrambleChars);
    }

    ngOnInit(): void {

        // animate text in home
        new callScramblerAnimation(['constant'], '.animate-constant', '0123456789');
        new callScramblerAnimation(['variables'], '.animate-variables', 'abcdefghijklmnopqrstuvwxyz');

    }
}