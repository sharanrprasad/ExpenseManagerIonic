import UserModel from "./UserModel";

export type LoginData = {
  email:string,
  password: string
}


export type ErrorModel<T> = {
  errorCode : string,
  payload: T
}

export type UserSignUpModel = {
  user:UserModel,
  token : string
}
