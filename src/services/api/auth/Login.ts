import Http from "../../handlers/Http";
import { baseUrl } from "../urls/Links";
import { Endpoints } from "../urls/Endpoints";
import LocalStorageStore from "../../../util/db/LocalStorageStore";
import handleException from "../../handlers/ExceptionHandler";
import Alerts from "../../../util/alerts/Alerts";
import { IRequest } from "../../handlers/Request";
import User from "./User";

interface ILogin {
  validated: boolean;
  errors: Record<string, string>;
}

class Login implements ILogin, IRequest {
  validated: boolean = true;
  errors: Record<string, string> = {};
  public url: string;
  public Http: Http;
  public user: User;

  constructor() {
    this.Http = new Http();
    this.user = new User();
    this.url = baseUrl + Endpoints.login;
  }

  attempt(credentials: FormData) {
    handleException(() => {
      if (!this.validate(credentials)) {
        console.log(this.errors)
        return this.errors;
      }

      this.Http.post(this.url, credentials)
        .then((res) => {
          LocalStorageStore.storeData({ token: res.token });
          this.createUser();
          window.location.href = "/dashboard";
        })
        .catch((e) => {
          console.log(e);
          let message = e.response?.data?.message ?? e.message;
          Alerts.error(message);
        });
    });
  }

  private validate(credentials: FormData) {
    const email = credentials.get("email") as string;
    const password = credentials.get("password") as string;

    if (!email || email.trim() === "") {
      this.validated = false;
      this.errors["email"] = "Email field must not be left empty";
    }

    // eslint-disable-next-line
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      this.validated = false;
      this.errors["email"] = "Please enter a valid email address";
    }

    if (!password || password.trim() === "") {
      this.validated = false;
      this.errors["password"] = "Password field must not be left empty";
    }

    return this.validated;
  }

  private createUser(): void {
    this.user.getUser();
  }
}

export default Login;
