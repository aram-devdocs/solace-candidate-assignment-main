/**
 * Result type for error handling
 *
 * Represents the result of an operation that can either succeed or fail.
 * Inspired by Rust's Result type and functional error handling patterns.
 */

export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

/**
 * Creates a successful result
 */
export function success<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Creates a failed result
 */
export function failure<E = Error>(error: E): Result<never, E> {
  return { success: false, error };
}

/**
 * Type guard to check if result is successful
 */
export function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
  return result.success === true;
}

/**
 * Type guard to check if result is a failure
 */
export function isFailure<T, E>(result: Result<T, E>): result is { success: false; error: E } {
  return result.success === false;
}

/**
 * Unwraps a successful result or throws the error
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (isSuccess(result)) {
    return result.data;
  }
  throw result.error;
}

/**
 * Unwraps a successful result or returns a default value
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (isSuccess(result)) {
    return result.data;
  }
  return defaultValue;
}

/**
 * Maps a successful result to a new value
 */
export function map<T, U, E>(result: Result<T, E>, fn: (_data: T) => U): Result<U, E> {
  if (isSuccess(result)) {
    return success(fn(result.data));
  }
  return result;
}

/**
 * Maps a failed result to a new error
 */
export function mapError<T, E, F>(result: Result<T, E>, fn: (_error: E) => F): Result<T, F> {
  if (isFailure(result)) {
    return failure(fn(result.error));
  }
  return result;
}
