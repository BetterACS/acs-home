/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config();

export default {
    env: {
        MONGO_URI: process.env.MONGO_URI,
        DISCORD_API: process.env.DISCORD_API,
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
        DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI
    },

};