import { Router } from 'express';
import UserController from './controllers/UserController';
import DrawController from './controllers/DrawController';
import EmailService from './services/EmailService';

const routes = Router();

routes.get('/', UserController.index);
routes.get('/friends/:id', UserController.show);
routes.post('/friends/new', UserController.store);
routes.put('/friends/:id', UserController.update);
routes.delete('/friends/:id', UserController.destroy);
routes.post('/friends/draw', DrawController.drawFriends)
export default routes;