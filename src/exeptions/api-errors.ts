export class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь неавторизован');
  }

  static TokenExpired() {
    return new ApiError(401, "Токен устарел");
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(404, message, errors);
  }
}