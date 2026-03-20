import { pool } from '../config/mysql.js';

export async function submitContactForm(request, reply) {
    try {
        const { firstName, lastName, email, message } = request.body;

        if (!firstName || !lastName || !email || !message) {
            return reply.status(400).send({ error: 'All fields are required.' });
        }

        const query = `
            INSERT INTO contact_messages (firstName, lastName, email, message)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [firstName, lastName, email, message]);

        return reply.status(201).send({
            success: true,
            contactId: result.insertId,
            message: 'Your message has been received! Our team will get back to you.'
        });

    } catch (error) {
        request.log.error(error);

        // Return a distinct error if MySQL isn't running/connected
        if (error.code && error.code.startsWith('ECONN') || error.code === 'ER_ACCESS_DENIED_ERROR') {
            return reply.status(503).send({
                error: 'Contact service is temporarily unavailable due to a database connection issue. Please try again later.'
            });
        }

        return reply.status(500).send({ error: 'Failed to submit contact form.' });
    }
}
