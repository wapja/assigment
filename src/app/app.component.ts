import { Component, OnInit, ContentChild, AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppSelectors, selectUsers } from './core/selectors';
import { AppActions } from './core/actions';
import { State } from './core/reducer-map';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '../../node_modules/@angular/forms';
import { map, filter, concatMap, switchMap, tap, debounceTime, distinctUntilChanged } from '../../node_modules/rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit  {
  loading: Observable<boolean>;
  data: Observable<Array<any>>;
  users: Observable<Array<any>>;

  searchForm: FormGroup;

  constructor(private store: Store<State>) {

  }

  ngOnInit() {

    this.store.dispatch({ type: AppActions.DATA_FETCH });

    this.loading = this.store.select(AppSelectors.loading);
    this.data = this.store.select(AppSelectors.data);

    this.initForm();

    this.users = this.searchForm.valueChanges
    .pipe(
      tap((val) => this.data = null),
      switchMap(() => this.store.select(selectUsers(this.searchForm.value.country, this.searchForm.value.gender))),
      map(users =>
          users.filter(
              user => (
                (user.name.first.indexOf(this.searchForm.value.name) !== -1) ||
                (user.name.last.indexOf(this.searchForm.value.name) !== -1)
              )
          )
      )
    );

  }

  initForm() {

    this.searchForm = new FormGroup({
      'name': new FormControl(''),
      'country': new FormControl('All'),
      'gender': new FormControl('All'),
    });
  }


}
