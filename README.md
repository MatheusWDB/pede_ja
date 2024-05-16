npx sequelize-cli migration:generate --name create-teste




npx sequelize-cli db:migrate

npx sequelize-cli db:migrate:undo --name nome-da-migration



npx sequelize-cli model:generate --name restaurantes --attributes nome:string,email:string,cnpj:string,senha:string,logo:string

npx sequelize-cli model:generate --name telefonesRestaurante --attributes telefone:string

npx sequelize-cli model:generate --name pratos --attributes nome:string,valor:decimal,imagem:string

npx sequelize-cli model:generate --name ingredientes --attributes ingrediente:string

npx sequelize-cli model:generate --name pratoIngredientes --attributes temp:string

npx sequelize-cli model:generate --name clientes --attributes nome:string,telefone:string,mesa:integer

npx sequelize-cli model:generate --name pedidos --attributes finalizado:enum

npx sequelize-cli model:generate --name pedidoPratos --attributes quantidade:integer,observacao:string