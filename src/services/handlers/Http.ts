import { token } from "../../lib/Token";

import axios from "axios";

class Http {
  private token: string;

  constructor() {
    this.token = token;
  }

  async get(url: string = ""): Promise<any> {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      }
    };

    const response = await axios.get(url, config);

    return response.data;
  }

  async post(url: string, data: any): Promise<any> {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + this.token
      }
    };

    const response = await axios.post(url, data, config);

    return response.data;
  }

  // async post(url: string, data: any): Promise<any> {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Accept", "application/json");
  //   myHeaders.append("Authorization", "Bearer " + this.token);

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: myHeaders,
  //     redirect: "follow",
  //     body: data
  //   });

  //   return response.json();
  // }
}

export default Http;
