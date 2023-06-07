import {Router} from 'express';
import { loginUser, registerUser,initiateResetPassword,resetPassword, updateUserDetails, getUserDetails, getRole } from '../Controller/userController';
import { auth } from '../Middleware';


const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/reset', initiateResetPassword);

router.post('/reset/:id', resetPassword);

router.get('/get',auth, getUserDetails);

router.put('/update',auth, updateUserDetails);

router.get('/role',auth,getRole)

export { router };