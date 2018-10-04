import { Router } from 'express';
import findResource from './findResource';

export default factory => {
    const router = Router();

    router.get( '/', findResource( factory ));

    return router;
};
