/**
 * 
 * Atividade bem simples pra fazer até sábado, caso n terminarem, a gnt termina juntos no escritório:

  Criar uma API, bem básica, com rotas GET, POST, PUT e DELETE que tenha as seguintes funções:
  * Criar um usuário [x]
  * Listar todos os usuários criados [x]
  * Buscar um usuário Específico [x]
  * Editar um usuário [x]
  * Deletar um usuário [x]

  Obs: O usuário deve ter: nome, id (incrementado a cada criação) e idade somente, não precisa gravar
   em banco de dados, bem simples msm só com um array no back que v6 vão colocar os dados nesse array.
  Não precisa ser no padrão MVC.
 */

const express = require('express');
const app = express();

let usuarios = [];

let id = 0;
app.use(express.json());

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuario', (req, res) => {
  const { id = null } = req.query;
  if(!id) {
    return res.status(400).json({
      erro: {
        mensagem: 'Informe um id para buscar um usuário!'
      }
    });
  }
  const usuario = usuarios.find(usr => usr.id === Number(id));
  if(usuario) {
    return res.json(usuario);
  } 

  return res.status(404).json({
    erro: {
      mensagem: 'Usuário não encontrado'
    }
  });
});

app.post('/usuarios', (req, res) => {
  const { nome, idade } = req.body;

  let usuario = usuarios.find(usr => usr.nome === nome);

  if (usuario) {
    return res.json(usuario);
  }

  usuario = { 
    nome,
    idade,
    id,
  }


  id ++;

  usuarios.push(usuario);
  return res.json(usuario);
  
});

app.put('/usuarios/:id', (req, res) => {
  const { id = false } = req.params;
  const { nome = '', idade = '' } = req.body;
  if(!id) {
    return res.status(400).json({
      erro: {
        mensagem: 'Informe um id para buscar um usuário!'
      }
    });
  }

  const usuario = usuarios.find(usr => usr.id === Number(id));
  if(!usuario){
    return res.status(404).json({
      erro: {
        mensagem: 'Usuário não encontrado'
      }
    });
  }

  usuario.nome = nome || usuario.nome;
  usuario.idade = idade || usuario.idade;

  return res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  if(!id) {
    return res.status(400).json({
      erro: {
        mensagem: 'Informe um id para buscar um usuário!'
      }
    });
  }

  const indiceUsuario = usuarios.findIndex(usr => usr.id === Number(id));
  if(indiceUsuario < 0){
    return res.status(404).json({
      erro: {
        mensagem: 'Usuário não encontrado'
      }
    });
  }

  usuarios.splice(indiceUsuario, 1);

  return res.status(200).json({
    status: 'deletado'
  });

});

app.listen(3131, () => console.log('http://localhost:3131'));