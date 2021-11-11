import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import themes from "./../../assets/data/themes"


@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    //private themelistURL = "https://raw.githubusercontent.com/wannabemrrobot/daily-progress/main/themelist.json";

    themeList: any = {};
    private __themeUpdated: BehaviorSubject<string> = new BehaviorSubject("#ff1e56");
    public readonly themeUpdated: Observable<string> = this.__themeUpdated.asObservable();

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private http: HttpClient
    ) { }

    getThemeList() {
        return new Observable((observer) => {
            observer.next(themes);
            observer.complete();
        });
    }

    getThemeConfigs(themeList: any) {

        return forkJoin(
            themeList.map((theme: any) =>
                this.http.get<any[]>(theme.url))
        ).pipe(
            map(themeObjectList => themeObjectList.reduce((list: any, theme: any) => list.concat(theme), []))
        )
    }

    getStoredTheme() {
        let _theme = localStorage.getItem('@theme');
        let _themeAccent = localStorage.getItem('@themeAccent')

        let _themeAttrs = localStorage.getItem('@themeAttributes');
        let _themeAttrsParsed;
        if (_themeAttrs != null) {
            _themeAttrsParsed = JSON.parse(_themeAttrs);
        }

        return {
            _theme,
            _themeAccent,
            _themeAttrsParsed
        }
    }

    setTheme(name: string, themeObjList: any) {

        let fallBack = false;
        let themeName = name;
        let themeList = themeObjList;

        for (let theme of themeList) {
            if ((theme.$theme).toLowerCase() == themeName.toLowerCase()) {

                Object.keys(theme).forEach((key: any) => {
                    this.document.documentElement.style.setProperty(key, theme[key]);
                })

                // setting localstorage items for app level access
                localStorage.setItem('@theme', theme.$theme)
                localStorage.setItem('@themeAccent', theme['--accent-primary'])
                localStorage.setItem('@themeAttributes', JSON.stringify(theme))
                this.__themeUpdated.next(theme['--accent-primary']);

                fallBack = false;
                break;

            } else {
                fallBack = true;
            }
        }

        // sets the fallback theme
        if (fallBack == true) {

            let fallBackTheme: any = themeList.find((theme: any) => theme.$theme === "Zen White")

            localStorage.setItem('@theme', fallBackTheme.$theme)
            localStorage.setItem('@themeAccent', fallBackTheme['--accent-primary'])
            this.__themeUpdated.next(fallBackTheme['--accent-primary']);

            Object.keys(fallBackTheme).forEach((key: any) => {
                this.document.documentElement.style.setProperty(key, fallBackTheme[key]);
            })
        }
    }
}