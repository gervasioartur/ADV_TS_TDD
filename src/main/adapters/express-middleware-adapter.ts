import { NextFunction, Request, Response } from "express";
import { Middleware } from '../../presentation/protocols/'

export const adaptMiddleware = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest = {
            headers: req.headers
        }
        const httpResponse = await middleware.handle(httpRequest)
        if (httpResponse.statusCode === 200) {
            // res.status(httpResponse.statusCode).json(httpResponse.body)
            Object.assign(req, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
        }
    }
} 