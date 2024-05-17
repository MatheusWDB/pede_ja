const db = require('./../../db/models')
const { Op } = require('sequelize');

class RestauranteRepository {
    
    async verify(cadastrado) {
        try {
            const restaurante = await db.restaurantes.findOne({ 
                where: { 
                    [Op.or]: [
                        { cnpj: cadastrado.cnpj },
                        { senha: cadastrado.senha },
                        { email: cadastrado.email }
                        
                    ]
                }
            })

            const telefone = await db.telefonesRestaurante.findOne({
                where: { telefone: cadastrado.telefone }
            })

            const resultado = {
                cnpj: restaurante ? restaurante.cnpj : null,
                senha: restaurante ? restaurante.senha : null,
                email: restaurante ? restaurante.email : null,                
                telefone: telefone ? telefone.telefone : null
              };
          
            return resultado;

        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados');
        }
    } 

    async findId(cnpj) {
        try {
            const idR = await db.restaurantes.findOne({where: {cnpj: cnpj}})

            return idR.idRestaurante
            
        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados')
        }
    }

    async create(cadastro) {
        try {
            const telefone = cadastro.telefone
            delete cadastro.telefone
            const restaurante = await db.restaurantes.create(cadastro)
            await db.telefonesRestaurante.create({ 
                idRestaurante: restaurante.idRestaurante,
                telefone: telefone
                
            })

            return("Estabelecimento cadstrado")

        } catch (error) {
            console.error(error)
            throw new Error('Erro ao realizar o cadastro!');
        }
    }

    async update(restaurante, idR) {
        try {
            const [imagem, created] = await db.imagemRestaurantes.findOrCreate({
                where: { logo: restaurante.imagem},
                defaults: { logo: restaurante.imagem}
            })

            if (!created) {
                await imagem.update({ logo: restaurante.imagem });
            }
            
            await db.restaurantes.upsert(restaurante, {
                nome: restaurante.nome,
                email: restaurante.email,
                senha: restaurante.senha,
                idImgRestaurante: imagem.idImgRestaurante
                where: { idRestaurante: idR }
            })
        
            return("Restaurante atualizado")

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível atualizar!');
        }
    }
    
    /*async findById(id) {
        try {
            return await Restaurante.findOne({ where: { idRestaurante: id } });
        } catch (error) {
            throw new Error('Erro ao verificar os dados');
        }
    }*/
}

module.exports = new RestauranteRepository;
