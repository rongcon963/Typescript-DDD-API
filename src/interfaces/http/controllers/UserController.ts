import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { ok } from '../processors/response';
import { UserApplication } from '../../../application/user/UserApplication';

@controller('/api/v1/users')
export class UserController {
  constructor(
    @inject(TYPES.UserApplication)
    private readonly service: UserApplication
  ) {}

  @httpGet('/')
  async getAllUsers(@request() req: Request, @response() res: Response) {
    const books = await this.service.getAllUsers();
    return res.json(ok(books, 'Successfully retrieved all users'));
  }

  @httpGet('/:id')
  async getUserById(@request() req: Request, @response() res: Response) {
    const user = await this.service.getUserById(req.params.id);
    return res.json(ok(user, `Successfully retrieved a user with an ID of ${req.params.id}`));
  }

  @httpPost('/login')
  async login(@request() req: Request, @response() res: Response) {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await this.service.credentials({username, password});
    if(!user) {
      return res.status(401).send({error: 'Login failed! Check authentication credentials'});
    }
    const token = await this.service.authenticate({username, password});
    return res.json(ok({user,token}, `Successfully login a user with an ID of ${username}`));
  }

  @httpPost('/')
  async createUser(@request() req: Request, @response() res: Response) {
    const { body } = req;
    await this.service.createUser(body);
    return res.json({
      status: '000',
      message: 'Success'
    });
  }
}