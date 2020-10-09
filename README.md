# DOCS

#### PS: Todos os métodos INDEX aceitam query-params como filtros;

```
    - Ex de request buscando todos os usuários de um curso específico:
        - /users?course=923oivojdf98u934tb90ubf9gb8u

    - Ex de request buscando todos os eventos de um departamento e que não foram aceitos ainda:
        - /events?department=98dv9fd934mntovsoidi&isAccepted=false
```

## Autenticação:

```
    A autenticação na API é feita com base em BearerJWT.
    O token de autenticação deve ser informado no campo "authentication" nos headers, com o prefixo "Bearer".

    Caso o token não seja fornecido, ou seja inválido, a API retornará o status code 401.
```

```
    GET /auth : Informe se o usuário está logado ou não

    Status de resposta:
        - 200: Usuário logado;
        - 401: Usuário não está logado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
    POST /auth : Retorna token de autenticação

    Status de resposta:
        - 200: Login feito com sucesso;
        - 404: Usuário não encontrado;
        - 401: Senha incorreta;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

## Usuários:

```
GET /users : Retorna todos os usuários

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
GET /users/:userId : Retorna um usuário específico

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 404: Usuário não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
POST /users : Cria um novo usuário

    Status de resposta:
        - 201: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 409: Já existe usuário com o CPF informado cadastrado no curso informado;
        - 404: Curso não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
PUT /users/:userId : Atualiza um usuário

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 404: Usuário não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
DELETE /users/:userId : Deleta um usuário

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 404: Usuário não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

## Cursos:

```
GET /courses : Retorna todos os cursos

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
GET /courses/:courseId : Retorna um curso específico

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 404: Curso não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
POST /courses : Cria um novo curso

    Status de resposta:
        - 201: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 409: Já existe um curso com o nome informado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
PUT /courses/:courseId : Atualiza um curso

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 404: Curso não foi encontrado;
        - 409: Já existe um curso com o nome informado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
DELETE /courses/:courseId : Deleta um curso

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 404: Curso não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

## Departamentos:

```
GET /departments : Retorna todos os departamentos

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
GET /departments/:departmentId : Retorna um departamento específico

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 404: Departamento não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
POST /departments : Cria um novo departamento

    Status de resposta:
        - 201: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 409: Já existe um departamento com o nome informado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
PUT /departments/:departmentId : Atualiza um departamento

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 404: Departamento não foi encontrado;
        - 409: Já existe um departamento com o nome informado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
DELETE /departments/:departmentId : Deleta um departamento

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 404: Departamento não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

## Faculdades:

```
GET /sectors : Retorna todos as faculdades

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
GET /sectors/:sectorId : Retorna uma faculdade específico

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 404: Faculdade não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
POST /sectors : Cria uma nova faculdade

    Status de resposta:
        - 201: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 409: Já existe uma faculdade com o nome informado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
PUT /sectors/:sectorId : Atualiza uma faculdade

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 404: Faculdade não foi encontrada;
        - 409: Já existe uma faculdade com o nome informado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
DELETE /sectors/:sectorId : Deleta uma faculdade

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 404: Faculdade não foi encontrada;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

## Events:

```
GET /events : Retorna todos os eventos

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
GET /events/:eventId : Retorna um evento específico

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 404: Evento não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
POST /events : Cria um evento

    Status de resposta:
        - 201: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 500: API encontrou uma situação com a qual não sabe lidar;

    PS: Um evento sempre é criado com os status "isAccepted" e "isFinished" com valor "false";
```

```
PUT /events/:eventId : Atualiza um evento

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 404: Evento não foi encontrada;
        - 500: API encontrou uma situação com a qual não sabe lidar;

    PS: Não atualiza os status "isAccepted" e "isFinished";
```

```
PATCH /events/:eventId : Modifica os status de um evento

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body);
        - 404: Evento não foi encontrada;
        - 500: API encontrou uma situação com a qual não sabe lidar;

    PS: Aceita somente os booleans "isAccepted" e "isFinished" como payload;
```

```
DELETE /events/:eventId : Deleta um evento

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 404: Evento não foi encontrada;
        - 500: API encontrou uma situação com a qual não sabe lidar;

    PS: Um evento que está ocorrendo(data atual esta entre o início e o fim do evento) não pode ser excluído;
```

## Inscrições:

```
GET /subscriptions : Retorna todas as inscrições de um evento

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 500: API encontrou uma situação com a qual não sabe lidar;

    PS: id do evento deve ser informado no campo "event" nos headers da requisição;
```

```
GET /subscriptions/:subscriptionId : Retorna uma inscrição específica

    Status de resposta:
        - 200: Nenhum erro ocorrido;
        - 404: Evento não foi encontrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
POST /subscriptions : Cria uma inscrição num evento

    Status de resposta:
        - 201: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Campos inválidos passados no payload(body) ou evento já iniciado;
        - 409: Usuário já está inscrito no evento;
        - 404: Usuário ou evento não existem ou evento já encerrado;
        - 500: API encontrou uma situação com a qual não sabe lidar;
```

```
DELETE /subscriptions/:subscriptionId : Deleta uma inscrição

    Status de resposta:
        - 200: Nenhum erro ocorrido e o recurso foi criado;
        - 400: Evento já está em andamento;
        - 404: Evento não foi encontrada;
        - 500: API encontrou uma situação com a qual não sabe lidar;

    PS: Uma inscrição num evento que está ocorrendo(data atual esta entre o início e o fim do evento) não pode ser excluída;
```
