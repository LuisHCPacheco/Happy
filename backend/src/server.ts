import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';
import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json()); //Para o express entender json
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(3333); //localhost:3333

// Rota = conjunto (/dados, /home)
// Recurso = usuário

// Métodos HTTP = GET, POST, PUT, DELETE
// GET = Buscar uma informação (Lista, item)
// POST = Criando uma informação
// PUT = Editando uma informação
// DELETE = Deletando uma informação

// Parâmetros
// Query Params: http://localhost:3333/users?search=diego (utiliza-se o ? e concatena-se com &)
// Route Params: http://localhost:3333/users/1 (Identificar um recurso)
// Body: http://localhost:3333/users (Corpo da requisição (ex: dados para registro do usuario))

//ex:
//app.post('/users/:id', (request, response) => {
//    console.log(request.query);
//    console.log(request.params);
//    console.log(request.body);
//
//    return response.json({ message: "Hello World"});
//});