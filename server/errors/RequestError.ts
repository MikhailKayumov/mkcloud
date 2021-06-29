import AppError from './AppError';

export default class RequestError extends AppError {
  public static badRequest(
    message: string,
    errors: string[] = []
  ): RequestError {
    throw new this(message, 400, errors);
  }

  public static unauthorizedError(): RequestError {
    throw new this('Пользователь не авторизован', 401);
  }
}
