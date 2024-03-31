import { token } from "../../lib/Token";
import axios from "axios";

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

    const response = await axios.get(url, config);

    return response.data;
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
