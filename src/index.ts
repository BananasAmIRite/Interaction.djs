import InteractionClient from './InteractionClient';
import * as dotenv from 'dotenv';

dotenv.config();

new InteractionClient({ intents: [] }).login(process.env.CLIENT_TOKEN);
