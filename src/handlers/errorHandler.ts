export class ErrorValidation extends Error {
  private field: string;
  private value: string | number;

  constructor(field: string, value: string | number) {
    super(`❌ [ERROR]: Invalid value for ${field}: ${value}`);
    this.name = "ErrorValidation";
    this.field = field;
    this.value = value;
  }

  public getField(): string {
    return this.field;
  }

  public getValue(): string | number {
    return this.value;
  }
}

export class ErrorNotFound extends Error {
  private field: string;

  constructor(field: string) {
    super(`❌ [ERROR]: ${field} not found`);
    this.name = "ErrorNotFound";
    this.field = field;
  }

  public getField(): string {
    return this.field;
  }
}
