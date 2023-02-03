/**
 *
 * @export
 * @interface RegistrationSuccessful
 */
export interface RegistrationSuccessful {
  /**
   *
   * @type {string}
   * @memberof RegistrationSuccessful
   */
  id: string;
}

export function RegistrationSuccessfulFromJSON(
  json: any
): RegistrationSuccessful {
  return RegistrationSuccessfulFromJSONTyped(json, false);
}

export function RegistrationSuccessfulFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RegistrationSuccessful {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
  };
}

export function RegistrationSuccessfulToJSON(
  value?: RegistrationSuccessful | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    message: value.id,
  };
}
