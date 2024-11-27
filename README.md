Passos para executar o TCC

* Instalar o Docker (pode ser Docker Desktop)
* Se for windows verificar se o WSL está instalado (Dependência do Docker Desktop)
* Fazer um clone deste repositório
* Abrir um terminal dentro da raiz do projeto e executar o comando: 
`docker-compose up --build`
* Acessar o localhost:4200 pelo navegador (Chrome ou Edge)

## Notas

É necessário que as seguintes portas estajam livres para que o projeto seja executado:

* API: 8081
* Frontend: 4200
* Mysql: 3307

Para destruir os containers:

`docker-compose down -v`
