const db = require('./../../db/models')

class PratoRepository {
    
    async findAll(idR) {
        try {            
            return await db.pratos.findAll({
                where: { idRestaurante: idR },
                include: [
                    {model: db.ingredientes},
                    {model: db.imagemPratos}
                ]
              })
              
        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível localizar!');
        }
    }

    async create(prato, idR) {
        try {
            const imagem = await db.imagemPratos.create({imagem: prato.imagem})
            const novoPrato = await db.pratos.create({
                idRestaurante: idR,
                nome: prato.nome,
                valor: prato.valor,
                idImgPrato: imagem.idImgPrato
            })

            for(let i = 0; i < prato.ingredientes.length; i++) {
                let [novoIngrediente] = await db.ingredientes.findOrCreate({
                    where: { ingrediente: prato.ingredientes[i] }
                })
                await db.pratoIngredientes.create({
                    idPrato: novoPrato.idPrato,
                    idIngrediente: novoIngrediente.idIngrediente
                })
            }

            return("Prato adicionado")
    
        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível cadastrar!');
        }
    }

    async findById(idPr) {
        try {
            return await db.pratos.findOne({ where: { 
                    idPrato: idPr
                },
                include: {
                    model: db.ingredientes
                }
            })

        } catch (error) {
            throw new Error('Não foi possível localizar!');
        }
    }

    async update(prato, idPr) {
        try {
            await db.pratos.update(prato, {
                where: { idPrato: idPr }
            })
            
            await db.pratoIngredientes.destroy({
                where: { idPrato: idPr }
            })

            for (let i = 0; i < prato.ingredientes.length; i++) {
                let [ingrediente, created] = await db.ingredientes.findOrCreate({
                    where: { ingrediente: prato.ingredientes[i] },
                    defaults: { ingrediente: prato.ingredientes[i] }
                });
                
                if (!created) {
                    await ingrediente.update({ ingrediente: prato.ingredientes[i] });
                }
                
                await db.pratoIngredientes.upsert({
                    idPrato: idPr,
                    idIngrediente: ingrediente.idIngrediente
                });
            }

            return("Prato atualizado")

        } catch (error) {
            console.error(error)
            throw new Error('Não foi possível atualizar!');
        }
    }

    async delete(idPr) {
        try {
            await db.pratos.destroy({ where: { idPrato: idPr } })

            return("Prato deletado")

        } catch (error) {
            throw new Error('Não foi possível deletar!');
        }
    }
}

module.exports = new PratoRepository()
