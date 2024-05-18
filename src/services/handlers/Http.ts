import { token } from "../../lib/Token";
import axios from "axios";
import User from "../api/auth/User";
import Alerts from "../../util/alerts/Alerts";

class Http {
  private static instance: Http | null = null;
  private token: string;

  private constructor() {
    this.token = token;
  }

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http();
    }
    return Http.instance;
  }

  async get(url: string = ""): Promise<any> {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    };

    // const response = await axios.get(url, config);

    // return response.data;
    try {
      const response = await axios.get(url, config);

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        User.logout();
      } else {
        // console.error("Error occurred:", error);
        Alerts.error(
          "An error occured while processing your request. Try again shortly",
        );
      }
    }
  }

  async post(url: string, data: any): Promise<any> {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + this.token,
      },
    };

    const response = await axios.post(url, data, config);

    return response.data;
  }
}

export default Http;
