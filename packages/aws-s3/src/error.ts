export class S3Error extends Error {
  public readonly code: string;
  public readonly statusCode?: number;

  constructor(message: string, code = "S3_ERROR", statusCode?: number) {
    super(message);
    this.name = "S3Error";
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class S3ValidationError extends S3Error {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "S3ValidationError";
  }
}

export class S3ConfigurationError extends S3Error {
  constructor(message: string) {
    super(message, "CONFIGURATION_ERROR");
    this.name = "S3ConfigurationError";
  }
}
