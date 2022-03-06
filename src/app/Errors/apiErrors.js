class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }

  static notFound() {
    return new ApiError("Aradığınız sayfa bulunamadı", 404);
  }

  static wrongID() {
    return new ApiError("Lütfen geçerli bir ID bilgisi giriniz", 203);
  }

  static notFoundWith(info) {
    return new ApiError(`${info} kaydı bulunamadı.`, 404);
  }
}

module.exports = ApiError;
