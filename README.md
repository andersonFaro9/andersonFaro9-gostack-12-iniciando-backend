# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;


**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano;
**RN**

 - O link enviado  por email para resetar  senha, deve expirar em 2h;
 - O usuário precisa  confirmar  a nova senha  ao resetar sua senha;
 -
# Atualização do perfil
**RF**
- O usuário deve poder atualizar seu nome, email e senha;
-

**RNF**


**RN**
- O usua´rio não pode alterar seu email para um email  já atualizado;
- Para atualizar sua senha o usuário deve informar  a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar  a nova senha;

# Painel do prestador

**RF**
    - O usuário deve poder listar seus agendamentos de um dia especifico;
    - O prestrador deve receber uma notificação sempre que  houver um novo  agendamento;
    - O prestrador deve poder visualizar  as notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armenzenado em cache;
- As notificações do prestrador devem ser armazenadas  no MongoDb;
- As notificaçoes do prestrador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida  para que o prestrador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestradores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestrador;
-  O usuário  poder listar horários disponiveis em um dia especifico de um prestador;
-  O usuário  deve poder realizar  um novo agendamento com um prestrador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar  1h exatamente;
- Os agendamentos devem estar  disponiveis entre 8h e às 18h(primeiro horário às 8h e ultimo as 17h);
- O usuário não pode  agendar em um horário já ocupado;
- O usuári onão pode agendar no horário que já passou;
- O usuário não pode agendar serviços  consigo mesmo;
-
