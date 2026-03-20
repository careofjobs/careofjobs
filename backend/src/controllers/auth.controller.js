import { UserModel } from '../models/User.js';

export async function registerUser(request, reply) {
    try {
        const { firstName, lastName, email, password } = request.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return reply.status(400).send({ error: 'All fields are required' });
        }
        if (password.length < 6) {
            return reply.status(400).send({ error: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return reply.status(409).send({ error: 'User with this email already exists' });
        }

        // Create new user (defaults to 'user' role)
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password
        });
        await newUser.save();

        // Sign token
        const token = await reply.jwtSign({
            id: newUser._id,
            role: newUser.role
        }, { expiresIn: '7d' });

        return reply.status(201).send({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Failed to register user' });
    }
}

export async function loginUser(request, reply) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return reply.status(400).send({ error: 'Email and password are required' });
        }

        // Find user
        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return reply.status(401).send({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return reply.status(401).send({ error: 'Invalid email or password' });
        }

        // Sign token
        const token = await reply.jwtSign({
            id: user._id,
            role: user.role
        }, { expiresIn: '7d' });

        return reply.status(200).send({
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Failed to login' });
    }
}

export async function getMe(request, reply) {
    try {
        // request.user is set by the authenticate decorator
        const user = await UserModel.findById(request.user.id).select('-password');

        if (!user) {
            return reply.status(404).send({ error: 'User not found' });
        }

        return reply.status(200).send({ user });
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Failed to fetch user profile' });
    }
}
