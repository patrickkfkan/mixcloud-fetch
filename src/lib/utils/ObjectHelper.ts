export default class ObjectHelper {

  static getProperty(obj: any, prop: string, required = false) {
    if (typeof obj !== 'object') {
      if (required) {
        throw new ObjectPropertyNotFoundError(prop);
      }
      return undefined;
    }
    const props = prop.split('.');
    let v = obj;
    while (props.length > 0) {
      const p = props.shift() as string;
      if (v && typeof v === 'object') {
        v = v[p];
        if (v === undefined) {
          if (required) {
            throw new ObjectPropertyNotFoundError(prop);
          }
          return v;
        }
      }
      else if (required) {
        throw new ObjectPropertyNotFoundError(prop);
      }
    }
    return v;
  }

  static hasProperty<T extends string[]>(obj: any, ...prop: T): obj is Record<string, any> & { [K in T[number]]: any; } {
    if (typeof obj !== 'object') {
      return false;
    }
    for (const p of prop) {
      if (!Reflect.has(obj, p)) {
        return false;
      }
    }

    return true;
  }

  static clean<T extends object>(obj: T): T {
    const keys = Object.keys(obj);
    for (const key of keys) {
      if (obj[key as keyof T] === undefined) {
        delete obj[key as keyof T];
      }
    }
    return obj;
  }
}

export class ObjectPropertyNotFoundError extends Error {

  prop: string;

  constructor(prop: string) {
    super();
    this.name = 'ObjectPropertyNotFoundError';
    this.prop = prop;
  }
}
