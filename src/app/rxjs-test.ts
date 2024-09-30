import {
  BehaviorSubject,
  catchError, combineLatest, concat, concatMap, defer,
  delay, distinct, distinctUntilChanged, exhaustMap,
  filter,
  first, forkJoin,
  from, fromEvent,
  interval,
  last,
  map,
  merge, mergeMap, of,
  reduce, retry,
  scan, skip, skipUntil, skipWhile, switchMap,
  take, takeUntil,
  takeWhile,
  tap,
  throwError, withLatestFrom
} from "rxjs";

const button = document.querySelector('button')!;
const buttonClick$ = fromEvent(button, 'click');
