import 'reflect-metadata';

/**
 * @see: https://cloudmark.github.io/Json-Mapping/
 * @see: https://stackoverflow.com/questions/72009995/typeerror-reflect-getmetadata-is-not-a-function
 * @see: https://blog.bitsrc.io/typescripts-reflect-metadata-what-it-is-and-how-to-use-it-fb7b19cfc7e2
 */
const JSON_METADATA_KEY = 'jsonProperty';

export interface IJsonMetaData<T> {
  name?: string;
  clazz?: { new (): T };
}

export function JsonProperty<T>(metadata?: IJsonMetaData<T> | string) {
  if (metadata instanceof String || typeof metadata === 'string') {
    return Reflect.metadata(JSON_METADATA_KEY, {
      name: metadata,
      clazz: undefined,
    });
  } else {
    let metadataObj = metadata as IJsonMetaData<T>;

    return Reflect.metadata(JSON_METADATA_KEY, {
      name: metadataObj ? metadataObj.name : undefined,
      clazz: metadataObj ? metadataObj.clazz : undefined,
    });
  }
}

export function getClazz(target: object, propertyKey: string) {
  return Reflect.getMetadata(JSON_METADATA_KEY, target, propertyKey);
}

export function getJsonProperty<T>(target: object, propertyKey: string): IJsonMetaData<T> {
  return Reflect.getMetadata(JSON_METADATA_KEY, target, propertyKey);
}

export class JsonMapProperties {
  // check if value is type primitive
  static isPrimitive(name: any) {
    switch (typeof name) {
      case 'string':
      case 'number':
      case 'boolean':
        return true;
    }

    return !!(
      name instanceof String ||
      name === String ||
      name instanceof Number ||
      name === Number ||
      name instanceof Boolean ||
      name === Boolean
    );
  }

  // check if is array or function
  static isArray<T>(array: any): boolean {
    if (array instanceof Array) {
      return true;
    } else if (typeof Array.isArray === 'function') {
      return Array.isArray(array);
    } else {
      return !!(array instanceof Array);
    }
  }
  static validator<T>(
    clazz: { new (): T },
    obj: object,
    key: string,
    innerJson: any,
    jsonObject: object | Array<object>,
    propertyName: string,
    name: string
  ): any {
    // check if clazz if array values
    if (JsonMapProperties.isArray(clazz)) {
      const metadata = getClazz(obj, key);

      if (metadata.clazz || JsonMapProperties.isPrimitive(name)) {
        return innerJson && JsonMapProperties.isArray(innerJson)
          ? innerJson.map((target: any) => JsonMapProperties.deserialize(metadata.clazz, target))
          : undefined;
      }
      return innerJson;
    }

    // check if not string values
    if (!JsonMapProperties.isPrimitive(name)) {
      return Array.isArray(innerJson)
        ? innerJson.map((target: any) => JsonMapProperties.deserialize(clazz, target))
        : JsonMapProperties.deserialize(clazz, innerJson);
    }

    // check if clazz if array values
    return Array.isArray(jsonObject) ? jsonObject.map((target: any) => target[propertyName])[0] : innerJson;
  }

  /**
   *
   * @param classSerialize {new (): T} class generic
   * @param jsonObject object generic
   * @returns generic
   */
  static deserialize<T>(classSerialize: { new (): T }, jsonObject: any) {
    //check if values is undefined
    if (classSerialize === undefined || jsonObject === undefined) return undefined;

    // create instance of object generic
    const obj: any = new classSerialize();

    // process get values
    const propertyMetadataFn = (propertyMetadata: IJsonMetaData<T>, key: string) => {
      // get properti name
      const propertyName = propertyMetadata.name || key;

      // get json
      const innerJson = jsonObject ? jsonObject[propertyName] : undefined;

      // get class of json from IJsonMetaData
      const { clazz, name } = getClazz(obj, key);

      return JsonMapProperties.validator(clazz, obj, key, innerJson, jsonObject, propertyName, name);
    };

    // return new object with values fiil up
    return Object.keys(obj).reduce((acc, key) => {
      // get metadata with jsonProperty decorator
      const propertyMetadata = getClazz(obj, key);

      if (propertyMetadata) {
        acc[key] = propertyMetadataFn(propertyMetadata, key);
      } else if (jsonObject && jsonObject[key] !== undefined) {
        // not jsonProperty decorator
        acc[key] = jsonObject[key];
      }

      return acc;
    }, obj);
  }
}
