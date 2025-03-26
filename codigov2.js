const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


let usuarios =[
    {id:1,nome:'Ana'},
    {id:2,nome:'Matheus'},
];

//get /usuarios- lista todos os usuarios
app.get('/usuarios',(req,res) =>{
    res.json(usuarios);
});

app.get('/usuarios/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (usuario){
        res.json(usuario);
    }else {
        res.status(404).json({mensagem: 'Usuario não encontrado'});

    }
});



//POST /usuarios -Cria um novo usuário
app.post('/usuarios',(req,res) =>{
    const novoUsuario = req.body;
    novoUsuario.id = usuarios.length + 1; //simplificado usar algo mais robusto
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

//PUT /usuarios/:id - atualiza um usuario existente
app.put('/usuarios/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex !== -1){
        usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...req.body};
        res.json(usuarios[usuarioIndex]);
    }else {
        res.status(404).json({mensagem:'usuario não encontrado'});
    }
});

//DELETE /usuarios/:id - exclui um usuario
app.delete('/usuarios/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    //encontra o indice do usuario

    if(usuarioIndex !== -1){
        usuarios.splice(usuarioIndex, 1);//remove usuario pelo indice
        res.status(204).end(); //status 204 "no content" -Indica sucesso na deleção, sem conteudo a retornar 
    } else {
        res.status(404).json({mensagem:'Usuário não encontrado'});
    }

});
    //liga nosso servidor 

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost: ${port}`);//crase !
});