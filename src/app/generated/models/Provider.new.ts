/**
 *
 * @export
 * @interface Provider
 */
export interface Provider {
  /**
   *
   * @type {string}
   * @memberof Provider
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof Provider
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof Provider
   */
  password: string;
  /**
   *
   * @type {string}
   * @memberof Provider
   */
  url: string;
  /**
   *
   * @type {string}
   * @memberof Provider
   */
  description: string;
}

export function NewUserFromJSON(json: any): Provider {
  return ProviderFromJSONTyped(json, false);
}

export function ProviderFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Provider {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json["name"],
    email: json["email"],
    password: json["password"],
    url: json["url"],
    description: json["description"],
  };
}

export function NewUserToJSON(value?: Provider | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    email: value.email,
    password: value.password,
    url: value.url,
    description: value.description,
  };
}
