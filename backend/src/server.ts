import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './swagger';
import { PORT } from './config';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

setupSwagger(app);
app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
