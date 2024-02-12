import handleException from "../../handlers/ExceptionHandler";
import Http from "../../handlers/Http";
import { baseUrl } from "../urls/Links";
import { Endpoints } from "../urls/Endpoints";
import LocalStorageStore from "../../../util/db/LocalStorageStore";
import { IRequest } from "../../requests/Request";

class User implements IRequest {
  public Http: Http;
  public url: string;

  constructor() {
    this.Http = new Http();
    this.url = baseUrl + Endpoints.me;
  }

  getUser(): any {
    handleException(() => {
      this.Http.get(this.url)
        .then((res) => {
          console.log(res);
          this.saveUserInLocalStorage(res);
          //   return res;
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  saveUserInLocalStorage(user: Record<string, any>) {
    handleException(() => {
      LocalStorageStore.storeData({ user: user });
    });
  }

  logout(): any {
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
