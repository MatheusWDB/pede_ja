const RestauranteRepository = require( '../repositories/RestauranteRepository.js')

class RestauranteController { 
    
    async register(req, res){
        const cadastro = req.body
        const cnpj = cadastro.cnpj
        const email = cadastro.email
        let verificar = await RestauranteRepository.verifyCnpj(cnpj)
        if(verificar === null) {
            verificar = await RestauranteRepository.verifyEmail(email)

            if (verificar === null){
                const resposta = await RestauranteRepository.create(cadastro)
                return res.status(201).send(resposta)
            } 

            return res.status(400).send('Email já cadastrado!')         
        }

        res.status(400).send('Cnpj já cadastrado!')
    }
    
    async login(req, res){
        let cnpj = req.body.cnpj
        let senha = req.body.senha
        const verificar = await RestauranteRepository.verifyCnpj(cnpj)
        if(verificar === null) {
            return res.status(400).json('Cnpj não cadastrado!')
        } else if (senha !== verificar.senha){
            return res.status(401).json('Senha incorreta!')
        }

        const idR = await RestauranteRepository.findId(cnpj)
        console.log(idR)
        const token = { idRestaurante: idR}
        res.status(202).json({ auth: true, token })
    }    

    async recover(req, res){
        const cnpj = req.body.cnpj
        const verificar = await RestauranteRepository.verifyCnpj(cnpj)

        if (verificar === null) {
            return res.status(400).json('Cnpj não cadastrado!')
        }

        res.status(200).send(verificar.email)
    }
        
    async logout(req, res){
        blacklist.push(req.headers['x-access-token'])
        res.status(200).end()
    }

    /*async show(req, res){
        const id = req.params.idR
        const row = await RestauranteRepository.findById(id)
        res.status(200).json(row)
    }*/
      
}

module.exports.class = new RestauranteController()
