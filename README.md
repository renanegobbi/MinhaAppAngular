# MinhaAppAngular
Uma simples aplicação Web desenvolvida com **Node 14.15.0** e **Angular CLI 13.3.0** para visualizar as funcionalidades de fornecedores e produtos desenvolvidas pela API MinhaApi (https://github.com/renanegobbi/MinhaApi).

<h4 align="center"> 
  <a href="#Tecnologias-e-ferramentas">Tecnologias e ferramentas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="#Sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Demonstração">Demonstração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  </br>
  <a href="#Como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Licença">Licença</a>
</h4>

<br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<div id='Tecnologias-e-Ferramentas'/>

O projeto foi desenvolvido com as seguintes tecnologias e ferramentas:

- [Visual Studio Code](https://code.visualstudio.com)
- [Node 14.15.0](https://nodejs.org/ja/blog/release/v14.15.0/)
- [Angular CLI 13.3.0](https://www.npmjs.com/package/@angular/cli/v/13.3.0)

<div id='Sobre-o-projeto'/>

# Sobre o projeto

Este é um projeto Web desenvolvido com **Node 14.15.0** e **Angular CLI 13.3.0** para detalhar/criar/atualizar/excluir os dados disponibilizados por uma documentação de API, por Swagger, que realiza a gestão de fornecedores e produtos.

# Demonstração

A aplicação é composta de duas telas.   

1 - O quadro abaixo resume os dados listados pela tela de fornecedores:

Nome do parâmetro   | Resumo
--------- | ------
Id | Id do fornecedor
Nome | Nome do fornecedor
Descrição | Descrição do fornecedor
Cnpj | CNPJ do fornecedor
Status | Status de ativação do fornecedor

<p align="center">
  <img src="https://github.com/renanegobbi/_TesteReadme/blob/main/github/PrintTelaFornecedores.PNG">
</p>

2 - O quadro abaixo resume os dados listados pela tela de produtos:

Nome do parâmetro   | Resumo
--------- | ------
Id | Id do produto
Fornecedor | Id do fornecedor
Descrição | Descrição do produto
Fabricação | Data de fabricação do produto
Validade | Data de validade do produto
Status | Status de ativação do produto

<p align="center">
  <img src="https://github.com/renanegobbi/_TesteReadme/blob/main/github/PrintTelaProdutos.PNG">
</p>

# Como usar

### Back-end
Após clonar o repositória da API (https://github.com/renanegobbi/MinhaApi), executar o seguinte comando no projeto MinhaApi.Data para criar o banco de dados.    

```bash
update-database
```

### Front-end
Após clonar este repositório, executar os seguintes passos:

```bash
cd MinhaAppAngular
npm install
```

### Deploy no Docker
Você pode construir a imagem e rodar o container com Docker.

Criar a imagem, executando o seguinte comando na raiz do Dockerfile:

```bash
docker build -t meusprodutos .
```

Rodar o container:

```bash
docker run --name meusprodutos -d -p 8080:80 meusprodutos
```

Acessar via browser:

```bash
http://localhost:8080/fornecedores/listar
```

# Licença
Este projeto está sob a licença do MIT. Consulte a [LICENÇA](https://github.com/TesteReteste/lim/blob/master/LICENSE) para obter mais informações.
![image](https://user-images.githubusercontent.com/64235143/214975853-7f44b28e-2fa9-4e3a-af7e-b4fdaf479285.png)

