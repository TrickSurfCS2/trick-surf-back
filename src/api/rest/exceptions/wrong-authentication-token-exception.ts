import HttpException from '#/api/rest/exceptions/http-exception';

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}

export default WrongAuthenticationTokenException;
