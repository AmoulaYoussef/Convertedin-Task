export interface ResponseResult<T> {
  result:T | undefined;
  error?:string;
}
