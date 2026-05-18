import express, { Router, ErrorRequestHandler, Request, Response, NextFunction} from 'express';
import cors from 'cors';

interface Options {
    port: number | string;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number | string;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    configure() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(express.static(this.publicPath));

        this.app.use(this.routes);

        //esto maneja errores enviados con next() o throw, pero no con res.status().json()
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error("Error global:", err);
            res.status(err.status || 500).json({
                status: 'error',
                message: err.message || 'Error interno del servidor'
            });
        });

        return this.app;

    }

    async start() {
        const app = this.configure();
        app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}