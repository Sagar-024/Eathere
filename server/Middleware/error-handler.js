import { CustomAPIError } from '../error/index.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode || 500).json({ msg: err.message });
  }

  
  return res.status(500).json({ msg: 'Something went wrong, try again later.' });
};

export default errorHandlerMiddleware;
