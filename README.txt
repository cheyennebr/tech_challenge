Sistema de Reservas Online

Este projeto é um Sistema de Reservas Online para uma empresa que disponibiliza espaços compartilhados, como salões de festas, quadras esportivas e salas de reuniões. O sistema permite que os membros da comunidade visualizem a disponibilidade dos espaços, reservem horários específicos e gerenciem suas reservas de forma eficiente através de uma interface web amigável.

Ferramentas e Tecnologias Utilizadas

	•	Node.js: Utilizado para construir a API backend.
	•	Express.js: Framework para Node.js usado para criar a API.
	•	Sequelize: ORM para gerenciar o banco de dados SQL.
	•	SQLite: Banco de dados utilizado para armazenar informações sobre espaços, reservas e usuários.
	•	HTML/CSS/JavaScript: Tecnologias frontend para criar a interface do usuário.
	•	Argon2: Biblioteca para hashing de senhas.
	•	Font Awesome: Biblioteca de ícones para melhorar a interface do usuário.

Estrutura do Projeto

	1.	Backend (server.js)
	•	Criação da API RESTful para gerenciar operações de reservas e espaços.
	•	Implementação de autenticação de usuários.
	•	Verificação de conflitos de horários de reserva.
	2.	Frontend
	•	Páginas HTML para usuários e administradores.
	•	Formulários para criação e gerenciamento de reservas e espaços.
	•	Estilização com CSS para uma interface moderna e responsiva.
	3.	Banco de Dados
	•	SQLite utilizado para armazenar dados de espaços, reservas e usuários.
	•	Sequelize para gerenciar a comunicação com o banco de dados.

Passo a Passo para Instalação e Execução

1. Pré-requisitos

	•	Node.js (versão 22.4.1)
	•	npm (Node Package Manager)
	•	Git (para clonar o repositório)

2. Clonar o Repositório

git clone https://github.com/cheyennebr/tech_challenge.git
cd tech_challenge

3. Instalar Dependências

npm install

4. Configuração do Banco de Dados

node sync.js

5. Configuração das Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias. Aqui está um exemplo:

PORT=3000
DATABASE_URL=sqlite:./database.sqlite

6. Executar o Servidor

node server.js

7. Acessar o Aplicativo

Abra o navegador e acesse http://localhost:3000.

Acesse com o usuário:
user | user123 - para acessar a página do usuário
admin | admin123 - para acessar a página do admin

Endpoints da API

Autenticação

	•	POST /login: Autenticação do usuário.
	•	Body: { "username": "user", "password": "pass" }
	•	Response: { "role": "admin" | "user" }

Espaços

	•	POST /spaces: Criação de um novo espaço.
	•	Body: { "name": "Sala de Reunião", "capacidade": 10 }
	•	GET /spaces: Listagem de todos os espaços.
	•	PUT /spaces/:id: Atualização de um espaço existente.
	•	Body: { "name": "Novo Nome", "capacidade": 20 }
	•	DELETE /spaces/:id: Exclusão de um espaço.

Reservas

	•	POST /bookings: Criação de uma nova reserva.
	•	Body: { "spaceId": 1, "date": "2024-07-15", "startTime": "10:00", "endTime": "12:00" }
	•	GET /bookings: Listagem de todas as reservas.
	•	PUT /bookings/:id: Atualização de uma reserva existente.
	•	Body: { "spaceId": 1, "date": "2024-07-15", "startTime": "10:00", "endTime": "12:00" }
	•	DELETE /bookings/:id: Exclusão de uma reserva.

Link para o GitHub

Repositório no GitHub

Considerações Finais

Este projeto foi desenvolvido como parte de um desafio técnico para demonstrar habilidades em desenvolvimento full-stack. Qualquer dúvida ou sugestão, por favor, entre em contato.