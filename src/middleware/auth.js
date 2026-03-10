import { env } from "../config/env.js";

/**
 * Fastify preHandler hook – requires a valid Bearer token in the
 * Authorization header.  Set API_KEY in your .env file.
 *
 * Usage inside a route definition:
 *   { preHandler: requireAuth }
 */
export async function requireAuth(request, reply) {
    const authHeader = request.headers["authorization"] ?? "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || token !== env.API_KEY) {
        return reply.status(401).send({ message: "Unauthorized" });
    }
}
