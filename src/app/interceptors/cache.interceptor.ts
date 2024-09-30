import {HttpHandlerFn, HttpRequest, HttpResponse} from "@angular/common/http";
import {of, startWith, tap} from "rxjs";

const cache = new Map<string, any>();

export function cacheInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {

  if (!isCacheable(req)) {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);

  // V1
  // return cachedResponse
  //   ? of(cachedResponse)
  //   : sendRequest(req, next);

  // V2 (emette la risposta in cache e poi quella fresca)
  return cachedResponse
    ? sendRequest(req, next).pipe(startWith(cachedResponse))
    : sendRequest(req, next);
}

function sendRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, event);
      }
    })
  );
}

export function isCacheable(req: HttpRequest<unknown>) {
  return req.method === 'GET';
}
