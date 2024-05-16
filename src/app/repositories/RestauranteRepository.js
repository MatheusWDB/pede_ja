const db = require('./../../db/models')
class RestauranteRepository {
    
    async verifyCnpj(cnpj) {
        try {
            return await db.restaurantes.findOne({ where: { cnpj: cnpj } })

        } catch (error) {
            throw new Error('Erro ao verificar os dados');
        }
    } 
    
    async verifyEmail(email) {
        try {
            return await db.restaurantes.findOne({ where: { email: email } });
            
        } catch (error) {
            throw new Error('Erro ao verificar os dados');
        }
    }

    async findId(cnpj) {
        try {
            const idR = await db.restaurantes.findOne({where: {cnpj: cnpj}})

            return idR.idRestaurante
            
        } catch (error) {
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

    /*async findById(id) {
        try {
            return await Restaurante.findOne({ where: { idRestaurante: id } });
        } catch (error) {
            throw new Error('Erro ao verificar os dados');
        }
    }*/
}

module.exports = new RestauranteRepository;
