import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  Time,
  ResourceId,
} from "../../common/structs";
import { PublicAccount } from "./account";

export type Collection = CollectionDoc<Login, LoginIncludes>;
export type LoginType = "password" | "employee";
export type LoginQuery = QueryParams<keyof LoginIncludes>;

export interface BaseLogin extends Resource {
  account: AccountInfo;
  time: Time;
  type: LoginType;
  success: boolean;
}

export interface PasswordLogin extends BaseLogin {
  type: "password";
}

export interface EmployeeLogin extends BaseLogin {
  type: "employee";
  employee: PublicAccount;
}

export type Login = PasswordLogin | EmployeeLogin;

export interface AccountInfo {
  id: ResourceId;
  ip: string;
}

export interface LoginIncludes {
  accounts: {
    [key: string]: PublicAccount;
  };
}

export async function getCollection(params: StandardParams<LoginQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.account().logins(),
  });
}
