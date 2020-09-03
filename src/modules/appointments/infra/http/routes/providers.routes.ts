import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersControler = new ProvidersController();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/',providersControler.index);

export default providersRouter;
