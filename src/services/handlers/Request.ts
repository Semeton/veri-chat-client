import Http from "./Http";

interface IRequest {
  Http: Http;
  url: string;
}

abstract class Request {
  validated: boolean = true;
  errors: Record<string, string> = {};

  validate(formData: FormData): Record<string, string> | boolean {
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (!value || value.toString().trim() === "") {
        this.validated = false;
        this.errors[key] = `${key} field must not be left empty`;
      }
    }

    if (Object.keys(this.errors).length > 0) {
      return this.errors;
    }

    return this.validated;
  }
}

export type { IRequest, Request };
