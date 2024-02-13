import Http from "../../handlers/Http";
import { baseUrl } from "../urls/Links";
import { Endpoints } from "../urls/Endpoints";
import LocalStorageStore from "../../../util/db/LocalStorageStore";
import handleException from "../../handlers/ExceptionHandler";
import Alerts from "../../../util/alerts/Alerts";
import { IRequest } from "../../handlers/Request";

interface ILogin {
  validated: boolean;
  errors: Record<string, string>;
}

class Login implements ILogin, IRequest {
  validated: boolean = true;
  errors: Record<string, string> = {};
  public url: string;
  public Http: Http;

  constructor() {
    this.Http = new Http();
    this.url = baseUrl + Endpoints.login;
  }

  attempt(credentials: FormData) {
    handleException(() => {
      if (!this.validate(credentials)) {
        return this.errors;
      }

      this.Http.post(this.url, credentials)
        .then((res) => {
          if (!res.error && res.token) {
            LocalStorageStore.storeData({ token: res.token });
          } else {
            Alerts.error(res.message);
          }
        })
        .catch((e) => {
          Alerts.error(e.message);
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
}

export default Login;
