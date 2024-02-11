import LocalStorageStore from "../../util/db/LocalStorageStore";

class Http {
  private token: string;

  constructor() {
    this.token = LocalStorageStore.getValue("token");
  }

  public async get(url: string = ""): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + this.token);

    const response = await fetch(url, {
      method: "GET",
      headers: myHeaders
    });

    return response.json();
  }

  public async post(url: string, data: any): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + this.token);

    const response = await fetch(url, {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: data
    });

    return response.json();
  }
}

export default Http;
