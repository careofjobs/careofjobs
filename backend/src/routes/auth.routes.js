import { registerUser, loginUser, getMe } from '../controllers/auth.controller.js';

export async function authRoutes(fastify, options) {
    fastify.post('/register', registerUser);
    fastify.post('/login', loginUser);

    fastify.get('/me', {
        onRequest: [fastify.authenticate]
    }, getMe);
}
