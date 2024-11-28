Passos para executar o TCC

* Instalar o Docker (pode ser Docker Desktop)
    Se for windows verificar se o WSL está instalado (Dependência do Docker Desktop)
* Fazer um clone deste repositório
* Abrir um terminal dentro da raiz do projeto e executar o comando: 
`docker-compose up --build`
* Faça o seed dos dados em outro terminal - este precisa ser bash (não pode der no powershell ou cmd) - executar o comando:
`docker exec -i mysql-db mysql -u root -pIodo2023! dina < ./db/seed.sql`
* Acessar o localhost:4200 pelo navegador (Chrome ou Edge)

## Notas

É necessário que as seguintes portas estajam livres para que o projeto seja executado:

* API: 8081
* Frontend: 4200
* Mysql: 3307

O seed contém dois usuarios:
comum: teste@teste.com (senha: 123qwe!!!)
administrador: admin@admin.com (senha: 123qwe!!!).
Ambos podem ser utilizados para testes e também é possível criar um usuário durante a utilização da aplicação, neste caso deverá ser utilizado um e-mail válido.

### Para destruir os containers:

`docker-compose down`
