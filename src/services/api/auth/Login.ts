import Http from "../../handlers/Http";
import { baseUrl } from "../urls/Links";
import { Endpoints } from "../urls/Endpoints";
import LocalStorageStore from "../../../util/db/LocalStorageStore";
import handleException from "../../handlers/ExceptionHandler";
import Alerts from "../../../util/alerts/Alerts";

interface ILogin {
  validated: boolean;
  errors: Record<string, string>;
}

class Login implements ILogin {
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
          if (!res.error) {
            LocalStorageStore.storeData({ token: res.token });
            console.log(res.token);
          } else {
            console.log(res);
            Alerts.error(res.message);
          }
        })
        .catch((e) => {
          console.log(e);
          return e;
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
