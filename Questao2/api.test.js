const request = require("supertest");
const app = require("./api");

let pedidos;
let rotas;

describe("Testando api de pedidos", ()=>{

    beforeEach(()=>{
        pedidos = [
            {
                produto: "tomate",
                quantidade: 2,
                endereco: { latitude: 10, longitude: 3}
            },
            {
                produto: "maçã",
                quantidade: 10,
                endereco: { latitude: 2,longitude: 1}
            },
            {
                produto: "batata",
                quantidade: 20,
                endereco: { latitude: 9,longitude: 3}
            },
            {
                produto: "arroz",
                quantidade: 3,
                endereco: { latitude: 5,longitude: 6}
            },
            {
                produto: "macarrão",
                quantidade: 10,
                endereco: { latitude: 8,longitude: 7}
            },
        ];

        rotas = [
            { latitude: 10, longitude: 3},
            { latitude: 2,longitude: 1},
            { latitude: 9,longitude: 3},
            { latitude: 8,longitude: 7}
        ];
    });

    test("Verifica se a rota POST /pedidos cria um novo pedido corretamente.", async ()=>{

        for(pedido of pedidos){
            const res = await request(app).post("/pedidos").send(pedido);
            expect(res.statusCode).toEqual(201);

            expect(res.body).toHaveProperty("endereco");
            expect(res.body.endereco).toHaveProperty("latitude");
            expect(res.body.endereco).toHaveProperty("longitude");
            expect(res.body).toHaveProperty("produto");
            expect(res.body).toHaveProperty("quantidade");

            expect(res.body.endereco.latitude).toEqual(pedido.endereco.latitude);
            expect(res.body.endereco.longitude).toEqual(pedido.endereco.longitude);
            expect(res.body.produto).toEqual(pedido.produto);
            expect(res.body.quantidade).toEqual(pedido.quantidade);
        }
    });

    
    test("Verifica se a rota GET /pedidos retorna a lista de pedidos corretamente.", async ()=>{     
      
        const res = await request(app).get("/pedidos");
        expect(res.statusCode).toEqual(200);
        res.body.forEach((pedido, index) => {
            expect(pedido).toHaveProperty("endereco");
            expect(pedido.endereco).toHaveProperty("latitude");
            expect(pedido.endereco).toHaveProperty("longitude");
            expect(pedido).toHaveProperty("produto");
            expect(pedido).toHaveProperty("quantidade");       

            expect(pedido.endereco.latitude).toEqual(pedidos[index].endereco.latitude);
            expect(pedido.endereco.latitude).toEqual(pedidos[index].endereco.latitude);
            expect(pedido.produto).toEqual(pedidos[index].produto);
            expect(pedido.quantidade).toEqual(pedidos[index].quantidade);    
        });
    });

    test("Verificar se a rota POST /rotas cria uma nova rota corretamente.", async ()=>{ 

        for(rota of rotas){
            const res = await request(app).post("/rotas").send(rota);
            expect(res.statusCode).toEqual(201);

            expect(res.body).toHaveProperty("latitude");
            expect(res.body).toHaveProperty("longitude");
            expect(res.body.latitude).toEqual(rota.latitude);
            expect(res.body.longitude).toEqual(rota.longitude);
        }
    });

    test("Verificar se a rota GET /rotas retorna a lista de rotas corretamente.", async ()=>{
        const res = await request(app).get("/rotas");

        expect(res.statusCode).toEqual(200);
        res.body.forEach((rota, index) => {
            expect(rota).toHaveProperty("latitude");
            expect(rota).toHaveProperty("longitude");   

            expect(rota.latitude).toEqual(rotas[index].latitude);
            expect(rota.longitude).toEqual(rotas[index].longitude);
        });
    });

    test("Verificar se a rota POST /melhor-rota retorna a melhor rota de entrega corretamente.", async ()=>{
        let res = await request(app).get("/melhor-rota/0");
        
        let melhorRota = [
            { latitude: 10, longitude: 3},
            { latitude: 9,longitude: 3},
            { latitude: 8,longitude: 7},
            { latitude: 2,longitude: 1}
        ]

        expect(res.body).toEqual(melhorRota);

        res = await request(app).get("/melhor-rota/1");

        melhorRota = [
            { latitude: 2,longitude: 1},
            { latitude: 9,longitude: 3},
            { latitude: 10, longitude: 3},
            { latitude: 8,longitude: 7}
        ]

        expect(res.body).toEqual(melhorRota);

        res = await request(app).get("/melhor-rota/2");

        melhorRota = [
            { latitude: 9,longitude: 3},
            { latitude: 10, longitude: 3},
            { latitude: 8,longitude: 7},
            { latitude: 2,longitude: 1}
        ]

        expect(res.body).toEqual(melhorRota);

        res = await request(app).get("/melhor-rota/3");

        melhorRota = [
            { latitude: 8,longitude: 7},
            { latitude: 9,longitude: 3},
            { latitude: 10, longitude: 3},
            { latitude: 2,longitude: 1}
        ]

        expect(res.body).toEqual(melhorRota);
    });

});