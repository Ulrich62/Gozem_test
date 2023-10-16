import { ApiResponse } from "dtos/apiResponse.dto";
import { Environment } from "environment";
import { ServiceBase } from "services/serviceBase.service";

export class FetchApi extends ServiceBase {
  private baseUrl: string;

  static getInstance() {
    return ServiceBase.get(FetchApi, Environment.apiBaseUrl);
  }

  constructor(baseUrl: string) {
    super(FetchApi);
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string, params?: Record<string, any>) {
    let fullUrl = this.baseUrl + url;
    if (params) {
      fullUrl += `?${new URLSearchParams(params)}`;
    }
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return getResponsePromise<T>(await response.json());
  }
}

function getResponsePromise<T>(
  response: ApiResponse<T>
): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    if (response.error) {
      reject(response.error);
    } else {
      resolve(response);
    }
  });
}
