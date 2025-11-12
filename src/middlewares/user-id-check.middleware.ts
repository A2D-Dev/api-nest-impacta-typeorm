import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UseIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserIdCheckMiddleware antes');

    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('ID inválido');
    }

    next();

    console.log('UserIdCheckMiddleware depois');
  }
}
