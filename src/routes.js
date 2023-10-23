import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);
router.get('/libro', libro.getOne);
router.post('/libronew', libro.add);
router.delete('/librodel', libro.delete);