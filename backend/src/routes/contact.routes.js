import { submitContactForm } from '../controllers/contact.controller.js';

export async function contactRoutes(fastify, options) {
    fastify.post('/contact', submitContactForm);
}
