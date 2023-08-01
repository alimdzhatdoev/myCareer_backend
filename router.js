import Router from "express";
import PostController from "./Requests/Posts/PostController.js";
import NewsController from "./Requests/News/NewsController.js";
import AuthController from "./Requests/Users/authController.js";
import { check } from "express-validator";
import authMiddleware  from "./Requests/Users/middleware/authMiddleware.js";
import roleMiddleware  from "./Requests/Users/middleware/roleMiddleware.js";

const router = new Router()

// Мероприятия
router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)

// Новости
router.post('/news', NewsController.create)
router.get('/news', NewsController.getAll)
router.get('/news/:id', NewsController.getOne)
router.put('/news', NewsController.update)
router.delete('/news/:id', NewsController.delete)

// Пользователи
router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть от 4 до 10 символов ").isLength({min:4, max:10}), 
], AuthController.registration)
router.post('/login', AuthController.login)
router.get('/getUsers', [authMiddleware, roleMiddleware(['USER'])] , AuthController.getUsers)
router.get('/addRole/:value?', AuthController.addRole)

export default router;
