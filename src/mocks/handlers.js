import { rest } from 'msw';

export const handlers = [
  rest.post('/registration', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.body(JSON.stringify({
        message: 'OK'
      }))
    );
  }),
  rest.post('/signin', (req, res, ctx) => {
    const validLogin = "hello@world.js";
    const validPassword = "root"
    let isValid = false;

    const data = req.body;

    if (data.login === validLogin && data.password === validPassword) {
      isValid = true;
    }
    
    if (isValid) {
      return res(
        ctx.status(200),
        ctx.body(JSON.stringify({
          message: 'OK'
        }))
      );
    }

    return res(
      ctx.status(401),
      ctx.body(JSON.stringify({
        message: 'ERROR'
      }))
    );
  }),
];
