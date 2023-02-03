import * as runtime from "../runtime";
import {
  NewService,
  NewServiceToJSON,
  NewUser,
  NewUserToJSON,
  RegistrationSuccessful,
  RegistrationSuccessfulFromJSON,
  Service,
  ServiceConnectionToJSON,
  ServiceFromJSON,
  ServiceInformation,
  ServiceInformationFromJSON,
  ServiceToJSON,
  SignIn,
  SignInToJSON,
} from "../models";
//import { APIClient } from "@wireapp/api-client";

export interface CreateNewServiceRequest {
  body?: NewService;
}

export interface GetRequest {
  appKey?: string;
  id?: string;
}

export interface Get2Request {
  userId: string;
}

export interface LoginBotProviderRequest {
  body?: SignIn;
}

export interface RegisterBotProviderRequest {
  body?: NewUser;
}

export interface UpdateServiceRequest {
  body?: Service;
}

export interface UpdateServiceConnectionPayload extends Service {
  password: string;
}

export interface UpdateServiceConnectionRequest {
  body?: UpdateServiceConnectionPayload;
}

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI {
  /**
   * Get Service List
   */
  async getServiceListRaw(): Promise<Service[]> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: "/services",
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    const rData = await response.json();

    return rData;
  }

  async getServiceList(): Promise<Service[]> {
    const response = await this.getServiceListRaw();
    return response;
  }

  /**
   * Create new service.
   */
  async createNewServiceRaw(
    requestParameters: CreateNewServiceRequest
  ): Promise<runtime.ApiResponse<ServiceInformation>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/services`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: NewServiceToJSON(requestParameters.body),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ServiceInformationFromJSON(jsonValue)
    );
  }

  async createNewService(
    requestParameters: CreateNewServiceRequest
  ): Promise<ServiceInformation> {
    const response = await this.createNewServiceRaw(requestParameters);
    return await response.value();
  }

  /**
   * Get the Service
   */
  async getServiceRaw(id?: string): Promise<runtime.ApiResponse<Service>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};
    // TODO: finish
    const response = await this.request({
      path: `/services/${id}`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ServiceFromJSON(jsonValue)
    );
  }

  /**
   * Get the Service
   */
  async getService(id?: string): Promise<Service> {
    const response = await this.getServiceRaw(id);
    return await response.value();
  }

  /**
   * Update Service
   */
  async updateServiceRaw(
    requestParameters: UpdateServiceRequest,
    id: string
  ): Promise<runtime.ApiResponse<Service>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/services/${id}`,
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: ServiceToJSON(requestParameters.body),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ServiceFromJSON(jsonValue)
    );
  }

  async updateService(
    requestParameters: UpdateServiceRequest,
    id: string
  ): Promise<Service> {
    const response = await this.updateServiceRaw(requestParameters, id);
    return await response.value();
  }

  /**
   * Update Service connection
   */
  async updateServiceConnectionRaw(
    requestParameters: UpdateServiceConnectionRequest,
    id: string
  ): Promise<runtime.ApiResponse<Service>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/services/${id}/connection`,
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: ServiceConnectionToJSON(requestParameters.body),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ServiceFromJSON(jsonValue)
    );
  }

  async updateServiceConnection(
    requestParameters: UpdateServiceConnectionRequest,
    id: string
  ): Promise<Service> {
    const response = await this.updateServiceConnectionRaw(
      requestParameters,
      id
    );
    return await response.value();
  }

  async uploadImage(requestParameters: any): Promise<any> {
    //const apitClient = new APIClient();
    //const response = apitClient.api.asset.postAsset(requestParameters);
    //return response.response;
    // const queryParameters: any = {};
    // const headerParameters: any = {};
    // headerParameters["Content-Type"] = "multipart/mixed; boundary=frontier";
    // const strMetadata = '{"public": true, "retention": "eternal"}';
    // let sb = "";
    // sb += "--frontier\r\n";
    // sb += "Content-Type: application/json, charset-urf8\r\n";
    // sb += `Content-Length: ${strMetadata.length}\r\n\r\n`;
    // sb += `${strMetadata}\r\n`;
    // sb += "--frontier\r\n";
    // sb += `Content-Length: ${requestParameters.length}\r\n`;
    // sb += `Content-MD5: ${base64MD5FromBuffer(requestParameters)}\r\n\r\n`;
    // const footer = "\r\n--frontier--\r\n";
    // const response = await this.request({
    //   path: "/provider/assets",
    //   method: "POST",
    //   headers: headerParameters,
    //   query: queryParameters,
    //   body: concatToBuffer(sb, requestParameters, footer),
    // });
    // return await response.json();
  }

  /**
   * Delete the Service
   */
  // async deleteServiceRaw(): Promise<runtime.ApiResponse<void>> {
  //   const queryParameters: any = {};

  //   const headerParameters: runtime.HTTPHeaders = {};

  //   const response = await this.request({
  //     path: `/services`,
  //     method: "DELETE",
  //     headers: headerParameters,
  //     query: queryParameters,
  //   });

  //   return new runtime.VoidApiResponse(response);
  // }

  /**
   * Delete the Service
   */
  // async deleteService(): Promise<void> {
  //   await this.deleteServiceRaw();
  // }

  /**
   * Login as Wire Bot Developer
   */
  async loginBotProviderRaw(
    requestParameters: LoginBotProviderRequest
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/login`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: SignInToJSON(requestParameters.body),
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Login as Wire Bot Developer
   */
  async loginBotProvider(
    requestParameters: LoginBotProviderRequest
  ): Promise<void> {
    await this.loginBotProviderRaw(requestParameters);
  }

  /**
   * Register as Wire Bot Developer
   */
  async registerBotProviderRaw(
    requestParameters: RegisterBotProviderRequest
  ): Promise<runtime.ApiResponse<RegistrationSuccessful>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/register`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: NewUserToJSON(requestParameters.body),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      RegistrationSuccessfulFromJSON(jsonValue)
    );
  }

  /**
   * Register as Wire Bot Developer
   */
  async registerBotProvider(
    requestParameters: RegisterBotProviderRequest
  ): Promise<RegistrationSuccessful> {
    const response = await this.registerBotProviderRaw(requestParameters);
    return await response.value();
  }
}
