import express from 'express';
import * as AC from '../controllers/account.controller.js';
import {auth} from '../middleware/auth.js';
import { validation } from '../middleware/validation.js';
import * as UV from '../controllers/user.validation.js';

const router = express.Router();
router.post('/account',auth(),AC.uploadDocuments, AC.createAccount);
router.post('/account/deposit',auth(), validation(UV.accountValidation), AC.deposit);
router.post('/account/withdraw',auth(), validation(UV.accountValidation), AC.withdraw);
router.get('/account/balance',auth(), AC.getBalance);
router.get('/account/transactions',auth(), AC.getTransactions);

export default router
