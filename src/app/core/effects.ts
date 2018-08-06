import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AppActions } from './actions';
import { catchError, switchMap, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { debounceTime, tap } from 'rxjs/internal/operators';
import { UserService } from '../share/user.service';
import { IUser } from '../share/user.interface';

@Injectable()
export class AppEffects {

  persons = new Array<IUser[]>();

  constructor(private actions: Actions, private userService: UserService) {
  }

  @Effect()
  public fetchData: Observable<any> = this.actions.ofType(AppActions.DATA_FETCH)
  .pipe(
    concatMap(() => {
      return this.userService.findAllUsers();
    }),
    switchMap((response) => {
      return of({ type: AppActions.DATA_FETCH_SUCCESS, payload: response.results });
    }),
    catchError(error => console.log(error) || of({ type: AppActions.DATA_FETCH_ERROR }))
  );
}
