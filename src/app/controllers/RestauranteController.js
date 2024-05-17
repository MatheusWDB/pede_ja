const RestauranteRepository = require( '../repositories/RestauranteRepository.js')

class RestauranteController { 
    
    async register(req, res){
        const cadastro = req.body
        const verificar = await RestauranteRepository.verifyRegister(cadastro)
        if(verificar) {
            if (verificar.cnpj === cadastro.cnpj){
                return res.status(400).send('Cnpj já cadastrado!')
            } 
            if (verificar.email === cadastro.email){
                return res.status(400).send('Email já cadastrado!')      
            }
            if (verificar.telefone === cadastro.telefone){
                return res.status(400).send('Telefone já cadastrado!') 
            }
        }
        await RestauranteRepository.create(cadastro)

        res.status(200).send('Estabelecimento cadastrado')

    }
    
    async login(req, res){
        const login = { cnpj: req.body.cnpj, senha: req.body.senha, email: null, telefone: null}
        const verificar = await RestauranteRepository.verify(login)
        if(verificar.cnpj === null) {
            return res.status(400).json('Cnpj não cadastrado!')
        } else if (login.senha !== verificar.senha){
            return res.status(401).json('Senha incorreta!')
        }

        const idR = await RestauranteRepository.findId(login.cnpj)
        const token = { idRestaurante: idR}
        res.status(202).json({ auth: true, token })
    }    

    async recover(req, res){
        const cnpj = { cnpj: req.body.cnpj, senha: null, email: null, telefone: null}
        const verificar = await RestauranteRepository.verify(cnpj)

        if (verificar.cnpj === null) {
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
