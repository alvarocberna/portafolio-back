import serverless from '@vendia/serverless-express';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/router';
import { envs } from './config/envs';

const server = new Server({
    port: envs.PORT,
    public_path: 'public',
    routes: AppRoutes.routes,
});

export const handler = serverless({ app: server.configure() });
