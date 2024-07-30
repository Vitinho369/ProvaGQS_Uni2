# Prova Gestão e Qualidade de Software - 2° Unidade
Para executar os testes é necessário possuir o node instalado

Inicialmente é necessário instalar os pacotes jest, supertest e o express.
Executando os seguintes comandos:
```
npm install jest supertest express
```

1. Em seguida configure o arquivo package.json adicionando esse texto:

```
"scripts": {
    "test": "jest"
  },
```

2. Por fim, basta executar os testes no terminal, utilizando o comando:
```
npm run test
```