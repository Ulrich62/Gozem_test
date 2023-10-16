interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export class ServiceBase {
  private static services = new Map<Type, any>();

  constructor(Service: Type) {
    if (ServiceBase.services.get(Service)) {
      throw new Error(`It's a singleton class and an instance already exists`);
    }
  }

  static get<T>(Service: Type<T>, ...args: any[]): T {
    if (!this.services.get(Service)) {
      this.services.set(Service, new Service(...args));
    }
    return this.services.get(Service) as T;
  }
}
