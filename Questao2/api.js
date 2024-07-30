const express = require("express");
const  {Endereco, Pedido} = require("../Models");
const {calcularDistancia, verificarMelhorRota} = require("../funcoes");
const app = express();
const port = 3000;

app.use(express.json()); //configura a aplicação para entender json
let pedidos = [];
let rotas = [];

app.get("/pedidos",(req, res)=>{
    res.status(200).json(pedidos);
});

app.post("/pedidos", (req, res)=>{
    let body = req.body;
    let pedido = new Pedido(body);
    pedidos.push(pedido);
    res.status(201).json(pedido);
});

app.get("/rotas", (req, res)=>{
    res.status(200).json(rotas);
});

app.post("/rotas", (req, res)=>{
    let body = req.body;
    let rota = new Endereco(body.latitude, body.longitude);
    rotas.push(rota);
    
    res.status(201).json(rota);
});

app.get("/melhor-rota/:id", (req, res)=>{
    let rotaEscolha = rotas[req.params.id];
    let rotasEscolha = rotas.filter(rota => rota !== rotaEscolha);

    let rotasReorganizadas = [rotaEscolha, ...rotasEscolha]; 
    let melhor_rota = [];

    while (rotasReorganizadas.length > 0) {

        let menorDistancia = Infinity;
        let indiceMelhorRota;
            
        rotasReorganizadas.forEach((rota, index) =>{
            let distancia = calcularDistancia (rotaEscolha, rota);
            
            if(distancia < menorDistancia){
                menorDistancia = distancia;
                indiceMelhorRota = index;
            }
            
        });
        
        melhor_rota.push(rotasReorganizadas[indiceMelhorRota]);
        rotaEscolha = rotasReorganizadas[indiceMelhorRota];

        [rotasReorganizadas[indiceMelhorRota], rotasReorganizadas[0]] = [rotasReorganizadas[0],rotasReorganizadas[indiceMelhorRota]]; 
        rotasReorganizadas.shift();
    };
    
    res.status(201).json(melhor_rota);

});

app.listen(port, ()=>{
    // console.log(`Aplicação rodando em http://localhost:${port}`);
});

module.exports = app;