import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ThemeService } from './service/theme.service';
import Utility from './common/utility';
import { defaultThemesList } from 'src/assets/data/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.component.responsive.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'wannabeme';

  breadcrumb_placeholder!: String;
  ValidPostNumbers: any = [];

  themeNames: any = [];
  themeObjList: any = [];

  lastThemeSelection: any;
  defaultThemes: any = defaultThemesList


  constructor(
    private router: Router,
    //private __githubService: GithubService,
    private __themeService: ThemeService
  ) { }

  // dynamic breadcrumb assigner
  breadcrumb() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        let url = event.url;
        let postRegex = new RegExp("(\/posts\/)[A-Za-z0-9]{1,}")
        let tagsRegex = new RegExp("(\/tags\/)[A-Za-z0-9]{1,}")

        // breadcrumb for home
        if (url == '/') {
          this.breadcrumb_placeholder = 'hello friend'

          // breadcrumb for cron@daily
        } else if (url == '/crondaily') {
          this.breadcrumb_placeholder = 'cron@daily'

          // breadcrumb for posts
        } else if (url == '/posts') {
          this.breadcrumb_placeholder = 'wget posts'

          // breadcrumb for post per page
        } else if (postRegex.test(url)) {
          this.isValidPost(url).subscribe((bool: any) => {
            if (bool == true) {
              this.breadcrumb_placeholder = 'cat post.dat'
            } else {
              this.breadcrumb_placeholder = 'invalid post'
            }
          })

          // breadcrumb for whoami
        } else if (url == '/whoami') {
          this.breadcrumb_placeholder = 'whoami'

          // breadcrumb for tags
        } else if (url == '/tags') {
          this.breadcrumb_placeholder = 'ls tags'

          // breadcrumb for tag id
        } else if (tagsRegex.test(url)) {
          let tag = url.split('/tags/')[1];
          this.breadcrumb_placeholder = `#tags`

          // breadcrumb for error page
        } else if (url == '/404') {
          this.breadcrumb_placeholder = 'errno 404'
        } else {
          this.breadcrumb_placeholder = 'errno 404'
        }
      })
  }

  // test for valid posts to display breadcrumb
  isValidPost(url: any) {
    let postno = Number(url.split('/posts/')[1]);
    let subject = new Subject<Boolean>();

    if (postno == NaN) {
      subject.next(false);
    } else {
      // save the postnumbers in a list for valid post path check in breadcrumbs
      // this.__githubService.getPostsJSON().subscribe((response: any) => {
      //   for(let post of response) {
      //     if(post.postno == postno) {
      //       subject.next(true);
      //       break;
      //     }else{
      //       subject.next(false);
      //     }
      //   }
      // })
    }

    return subject.asObservable();
  }

  // change theme on button click
  changeTheme(theme: string) {
    this.lastThemeSelection = theme;
    this.__themeService.setTheme(theme, this.themeObjList)
  }


  ngOnInit(): void {

    // breadcrumb function
    this.breadcrumb();

    // Initiate network call to get the theme if not available locally
    // get the themeList first

    let { _theme, _themeAttrsParsed } = this.__themeService.getStoredTheme();

    if (!(Utility.isNullOrEmptyOrWhitespace(_theme) && Utility.isNullOrEmptyOrWhitespace(_themeAttrsParsed))) {
      this.__themeService.setTheme(_theme as string, [_themeAttrsParsed]);
      this.lastThemeSelection = _theme;
    } else {
      let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (darkMode) {
        this.__themeService.setTheme('Dark Knight', this.defaultThemes);
        this.lastThemeSelection = 'Dark Knight';
      } else {
        this.__themeService.setTheme('Zen White', this.defaultThemes);
        this.lastThemeSelection = 'Zen White';
      }
    }

    this.__themeService.getThemeList().subscribe((themelist: any) => {
      // iterate through the themelist for url to fetch attributes
      this.__themeService.getThemeConfigs(themelist).subscribe((observableList: any) => {

        this.themeObjList = observableList;
      })

      for (let theme of themelist) {
        this.themeNames.push(theme.theme)
      }
    })
  }
}