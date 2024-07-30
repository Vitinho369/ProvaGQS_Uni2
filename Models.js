class Endereco{
    constructor(latitude, longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }    
}

class Pedido{

    constructor(json){
        this.endereco = new Endereco(json.endereco.latitude,json.endereco.longitude );
        this.quantidade =  json.quantidade;
        this.produto = json.produto;
        
    }
}

module.exports = {Endereco, Pedido};