const PratoRepository = require('../repositories/PratoRepository.js')

class PratoController {
    
    async list(req, res) {        
        const idR = req.params.idR
        let pratos = await PratoRepository.findAll(idR)
        pratos = pratos.map(pratos => {
            let ingredientes = pratos.prato_ingrediente.reduce((acc, ingrediente) => {
                acc.push( ingrediente.ingrediente
                );
                return acc;
            }, []);
            return {
                idPrato: pratos.idPrato,
                nome: pratos.nome,
                valor: pratos.valor,
                imagem: pratos.imagem,
                ingredientes: ingredientes
            }
        })
        res.status(200).json(pratos)
    }
    
    async store(req, res) {  
        const idR = req.params.idR
        const prato =  req.body
        const resposta = await PratoRepository.create(prato, idR)
        res.status(201).send(resposta)
    }

    async show(req, res) {
        const idPr = req.params.idPr
        let prato = await PratoRepository.findById(idPr)
        function mapearPrato() {
            let ingredientes = prato.prato_ingrediente.reduce((acc, ingrediente) => {
                acc.push( ingrediente.ingrediente
                );
                return acc;
            }, []);
            return {
                idPrato: prato.idPrato,
                nome: prato.nome,
                valor: prato.valor,
                imagem: prato.imagem,
                ingredientes: ingredientes
            }
        }

        prato = mapearPrato(prato)
        res.status(200).json(prato)
    }

    async update(req, res) {  
        const idPr = req.params.idPr
        const prato = req.body
        console.log(prato.ingredientes.length)
        const resposta = await PratoRepository.update(prato, idPr)
        res.status(200).send(resposta)
    }

    async delete(req, res) { 
        const idPr = req.params.idPr
        const resposta = await PratoRepository.delete(idPr)
        res.status(202).send(resposta)        
    }
}

module.exports = new PratoController()
