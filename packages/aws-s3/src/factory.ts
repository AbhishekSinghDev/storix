import { S3ConfigurationError } from "./error";
import { S3Service } from "./service";
import type { S3Config } from "./types";

export class S3ServiceFactory {
  private static instance: S3Service | null = null;

  /**
   * Create a new S3Service instance
   */
  static create(config: S3Config): S3Service {
    return new S3Service(config);
  }

  /**
   * Get or create a singleton S3Service instance
   */
  static getInstance(config?: S3Config): S3Service {
    if (!this.instance) {
      if (!config) {
        throw new S3ConfigurationError(
          "Configuration required for first initialization"
        );
      }
      this.instance = new S3Service(config);
    }
    return this.instance;
  }

  /**
   * Reset the singleton instance
   */
  static reset(): void {
    this.instance = null;
  }
}
