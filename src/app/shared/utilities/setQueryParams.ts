import {HttpParams} from '@angular/common/http'
export function setQueryParams(queryObj:{[key:string]:string | number}){
  let params = new HttpParams()
  Object.keys(queryObj).forEach(query => {
    if(queryObj[query]) params = params.set(query, queryObj[query]);
  })

  return params;
}
