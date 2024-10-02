import {HttpContextToken, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {retry, tap} from "rxjs";

export const RETRY_COUNT = new HttpContextToken(() => 3);
export const ERROR_COUNT = new HttpContextToken(() => 0);

export function retryInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {

  const retryCount = req.context.get(RETRY_COUNT);

  return next(req).pipe(
    // Non necessario
    tap({
      error: () => {
        req.context.set(ERROR_COUNT, req.context.get(ERROR_COUNT) + 1);
      }
    }),
    retry(retryCount)
  )
}

/*

Utilizzo:

this.http.get('...', {
  context: new HttpContext().set(RETRY_COUNT, 5)
}).pipe(
).subscribe({
  next: () => {},
  error: e => {}
});

 */
