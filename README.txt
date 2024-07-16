### Sistema de Reservas Online - README

#### Descrição

Este projeto é um Sistema de Reservas Online para gerenciar espaços compartilhados, como salões de festas, quadras esportivas e salas de reuniões. O sistema permite que os usuários visualizem a disponibilidade dos espaços, façam reservas e gerenciem suas reservas através de uma interface web amigável.

#### Funcionalidades

- Autenticação de usuários com diferentes roles (admin e usuário comum).
- Interface para administradores gerenciarem espaços (adicionar, editar e deletar espaços).
- Interface para usuários visualizarem a disponibilidade dos espaços e fazerem reservas.
- Verificação de conflitos de horários ao criar ou editar reservas.
- Notificações de sucesso e erro ao interagir com o sistema.

#### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js, utilizado para gerenciar o banco de dados.
- **SQLite**: Banco de dados relacional.
- **Argon2**: Biblioteca para hashing de senhas.
- **HTML/CSS/JavaScript**: Tecnologias frontend para criar a interface do usuário.
- **Font Awesome**: Biblioteca de ícones.

#### Pré-requisitos

- Node.js e npm instalados.
- Git instalado (opcional, mas recomendado).

#### Passo a Passo de Instalação

1. **Clone o repositório:**
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd booking-system
    ```

2. **Instale as dependências:**
    ```sh
    npm install
    ```

3. **Configure o banco de dados:**
    - Sincronize o banco de dados executando o script `sync.js`:
        ```sh
        node sync.js
        ```

4. **Inicie o servidor:**
    ```sh
    node server.js
    ```

5. **Acesse a aplicação:**
    - Abra o navegador e vá para `http://localhost:3000`.

#### Estrutura do Projeto

- `server.js`: Configuração do servidor e endpoints da API.
- `models/`: Modelos do banco de dados.
  - `space.js`: Modelo para espaços.
  - `booking.js`: Modelo para reservas.
  - `user.js`: Modelo para usuários.
- `public/`: Arquivos estáticos (HTML, CSS, JS).
  - `admin.html`: Página para administradores gerenciarem espaços.
  - `user.html`: Página para usuários fazerem reservas.
  - `index.html`: Página de login.
  - `css/style.css`: Estilos CSS para a interface.
  - `js/admin.js`: Lógica JavaScript para a página de administração.
  - `js/user.js`: Lógica JavaScript para a página de usuários.
  - `js/login.js`: Lógica JavaScript para a página de login.
- `sync.js`: Script para sincronizar o banco de dados.
- `seed.js`: Script para popular o banco de dados com dados iniciais.

#### Endpoints da API

- **Autenticação:**
  - `POST /login`: Autentica um usuário.
  - `POST /logout`: Faz logout de um usuário.

- **Espaços:**
  - `POST /spaces`: Cria um novo espaço.
  - `GET /spaces`: Retorna todos os espaços.
  - `GET /spaces/:id`: Retorna um espaço pelo ID.
  - `PUT /spaces/:id`: Atualiza um espaço pelo ID.
  - `DELETE /spaces/:id`: Deleta um espaço pelo ID.

- **Reservas:**
  - `POST /bookings`: Cria uma nova reserva.
  - `GET /bookings`: Retorna todas as reservas.
  - `PUT /bookings/:id`: Atualiza uma reserva pelo ID.
  - `DELETE /bookings/:id`: Deleta uma reserva pelo ID.

#### Modelos de Banco de Dados

- **User**:
  - `id`: Identificador único do usuário.
  - `username`: Nome de usuário.
  - `password`: Senha do usuário (hash).
  - `role`: Papel do usuário (admin ou usuário).

- **Space**:
  - `id`: Identificador único do espaço.
  - `name`: Nome do espaço.
  - `capacidade`: Capacidade máxima do espaço.

- **Booking**:
  - `id`: Identificador único da reserva.
  - `spaceId`: Identificador do espaço reservado.
  - `date`: Data da reserva.
  - `startTime`: Hora de início da reserva.
  - `endTime`: Hora de término da reserva.

#### Notificações

- Notificações de sucesso e erro são exibidas para o usuário ao interagir com o sistema.
- Notificações de sucesso têm fundo verde.
- Notificações de erro têm fundo vermelho.

#### Considerações Finais

Este sistema de reservas foi desenvolvido para ser uma solução completa e amigável para gerenciar a utilização de espaços compartilhados. A interface moderna e responsiva, aliada a um backend robusto, garante uma experiência de usuário eficiente e segura.

---

Este README fornece todas as informações necessárias para configurar, instalar e utilizar o Sistema de Reservas Online. Para mais detalhes sobre a implementação, consulte os arquivos do projeto.