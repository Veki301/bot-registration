import { exists } from "../runtime";

export interface Service {
  id?: string;
  name?: string;
  description?: string;
  base_url?: string;
  summary?: string;
  assets?: any[];
  auth_tokens?: string[];
  enabled?: boolean;
  tags?: string[];
  public_keys?: any[] | any; // dirty hack
}

export function ServiceFromJSON(json: any): Service {
  return ServiceFromJSONTyped(json, false);
}

export function ServiceFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Service {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
    description: !exists(json, "description") ? undefined : json["description"],
    base_url: !exists(json, "base_url") ? undefined : json["base_url"],
    summary: !exists(json, "summary") ? undefined : json["summary"],
    assets: !exists(json, "assets") ? undefined : json["assets"],
    auth_tokens: !exists(json, "auth_tokens") ? undefined : json["auth_tokens"],
    enabled: !exists(json, "enabled") ? undefined : json["enabled"],
    tags: !exists(json, "tags") ? undefined : json["tags"],
    public_keys: !exists(json, "public_keys") ? undefined : json["public_keys"],
  };
}

export function ServiceToJSON(value?: Service | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    description: value.description,
    base_url: value.base_url,
    summary: value.summary,
    assets: value.assets,
    auth_tokens: value.auth_tokens,
    enabled: value.enabled,
    tags: value.tags,
    public_keys: value.public_keys,
  };
}

export function ServiceConnectionToJSON(value?: any | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    description: value.description,
    base_url: value.base_url,
    summary: value.summary,
    assets: value.assets,
    auth_tokens: value.auth_tokens,
    enabled: value.enabled,
    tags: value.tags,
    public_keys: value.public_keys,
    password: value.password,
  };
}
