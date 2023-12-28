import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Catch,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const context = host.switchToHttp();
    const res = context.getResponse();
    const req = context.getRequest();

    res.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toLocaleString(),
      path: req.url,
    });
  }
}
