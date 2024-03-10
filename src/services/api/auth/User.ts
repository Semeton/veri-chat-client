import handleException from "../../handlers/ExceptionHandler";
import Http from "../../handlers/Http";
import { baseUrl } from "../urls/Links";
import { Endpoints } from "../urls/Endpoints";
import LocalStorageStore from "../../../util/db/LocalStorageStore";
import { IRequest } from "../../handlers/Request";
import Alerts from "../../../util/alerts/Alerts";

class User implements IRequest {
  public Http: Http;
  public url: string;

  constructor() {
    this.Http = new Http();
    this.url = baseUrl + Endpoints.me;
  }

  getUser(): void {
    handleException(() => {
      this.Http.get(this.url)
        .then((res) => {
          if (res.message) {
            Alerts.error(res.message);
          }
          this.saveUserInLocalStorage(res);
          window.location.reload();
        })
        .catch((e) => {
          console.error(e);
          Alerts.error(e);
        });
    });
  }

  private saveUserInLocalStorage(user: Record<string, any>): void {
    handleException(() => {
      LocalStorageStore.storeData({ user: user });
    });
  }

  static logout(): void {
    handleException(() => {
      const authData: string[] = ["token", "user"];
      authData.forEach((value) => {
        LocalStorageStore.deleteValue(value);
      });
      window.location.reload();
    });
  }
}

export default User;
