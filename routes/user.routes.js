import {Router} from 'express';
import * as UC from '../controllers/user.controller.js';
import { validation } from '../middleware/validation.js';
import * as UV from '../controllers/user.validation.js';

const router =Router();

router.post('/register',validation(UV.registerValidation) ,UC.uploadProfilePicture, UC.register);
router.post('/login', validation(UV.loginValidation),UC.login);

export default router
