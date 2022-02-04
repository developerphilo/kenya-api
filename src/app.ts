import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { json as bodyParser } from 'body-parser';
import compression from 'compression'; // compresses requests

import env from './env';
import helloWorld from './controllers/hello-world';
import countryController from './controllers/country';
import countyController from './controllers/counties';
import postcodeController from './controllers/postal-codes';
import wardsController from './controllers/wards';
import { debug } from './utilities/debug';

/**
 * This is a middleware example, and helps with debugging by outputing data for each request on the console.
 */
function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    debug(`${req.method}: ${req.originalUrl}`);
    next();
}

const app = express();

// Middlewares
app.set('port', env.port);
app.use(loggingMiddleware);
app.use(cors());
app.use(compression());
app.use(bodyParser());

// Controllers
app.use(helloWorld);
app.use('/county', countyController);
app.use('/country', countryController);
app.use('/wards', wardsController);
app.use('/postcodes', postcodeController);

export default app;
