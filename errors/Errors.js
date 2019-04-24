class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'Not Found Error';
      this.status = 404;
    }
  }
  
  class ValidationError extends Error {
    constructor(message, errors) {
      super(message);
      this.name = 'Validation Error';
      this.status = 400;
      this.errors = errors;
      this.message = errors;
    }
  }
  
    
  class DbError extends Error {
    constructor(message) {
      super(message);
      this.name = 'Data base Error';
      this.status = 500;
      this.message = message;
    }
  }
  
  class UnexpectedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'Unexpected Error';
      this.status = 500;
      this.message = message;
    }
  }

  class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'Unauthorized';
      this.status = 401;
      this.message = message;
    }
  }
   
  module.exports = {
    NotFoundError,
    ValidationError,
    DbError,
    UnexpectedError,
    UnauthorizedError
  };