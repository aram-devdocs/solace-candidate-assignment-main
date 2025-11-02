/**
 * Custom error types for application-specific errors
 */

/* eslint-disable no-unused-vars */
export enum ErrorCode {
  DATABASE_ERROR = "DATABASE_ERROR",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
}
/* eslint-enable no-unused-vars */

export interface AppErrorDetails {
  code: ErrorCode;
  message: string;
  details?: string;
  statusCode?: number;
}

/**
 * Base application error class with error codes and details
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: string;
  public readonly statusCode: number;

  constructor({ code, message, details, statusCode = 500 }: AppErrorDetails) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      statusCode: this.statusCode,
    };
  }
}

/**
 * Database operation error
 */
export class DatabaseError extends AppError {
  constructor(message: string, details?: string) {
    super({
      code: ErrorCode.DATABASE_ERROR,
      message,
      details,
      statusCode: 500,
    });
    this.name = "DatabaseError";
  }
}

/**
 * Resource not found error
 */
export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string | number) {
    const message = identifier
      ? `${resource} with identifier ${identifier} not found`
      : `${resource} not found`;
    super({
      code: ErrorCode.NOT_FOUND,
      message,
      statusCode: 404,
    });
    this.name = "NotFoundError";
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: string) {
    super({
      code: ErrorCode.VALIDATION_ERROR,
      message,
      details,
      statusCode: 400,
    });
    this.name = "ValidationError";
  }
}

/**
 * Unauthorized error
 */
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super({
      code: ErrorCode.UNAUTHORIZED,
      message,
      statusCode: 401,
    });
    this.name = "UnauthorizedError";
  }
}

/**
 * Forbidden error
 */
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden action") {
    super({
      code: ErrorCode.FORBIDDEN,
      message,
      statusCode: 403,
    });
    this.name = "ForbiddenError";
  }
}

/**
 * Type guard to check if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Converts any error to an AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError({
      code: ErrorCode.INTERNAL_ERROR,
      message: error.message,
      details: error.stack,
    });
  }

  return new AppError({
    code: ErrorCode.INTERNAL_ERROR,
    message: "An unexpected error occurred",
    details: String(error),
  });
}
