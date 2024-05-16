const Router = require('express')
const PratoController = require('./app/controllers/PratoController.js')
const modules = require('./app/controllers/RestauranteController.js')
const PedidoController = require('./app/controllers/PedidoController.js')

const router = Router()
const RestauranteController = modules.class

                //RESTAURANTES

        //
router.post('/cadastro', RestauranteController.register)
router.post('/login', RestauranteController.login)
router.post('/recuperar_senha', RestauranteController.recover)
//router.post('/logout', RestauranteController.logout)

        //Perfil
//router.get('/:idR', RestauranteController.show)
                
                //PRATOS

        //Cardápio (restaurante)
router.get('/:idR/cardapio', PratoController.list)
router.post('/:idR/cardapio', PratoController.store)

        //Prato selecionado
router.get('/:idR/cardapio/:idPr', PratoController.show)
router.put('/:idR/cardapio/:idPr', PratoController.update)
router.delete('/:idR/cardapio/:idPr', PratoController.delete)

                //PEDIDOS

        //Pedidos
router.get('/:idR/pedidos',  PedidoController.list)
router.delete('/:idR/pedidos',  PedidoController.delete)

        //Pedido selecionado
router.get('/:idR/pedidos/:idP',  PedidoController.show)
router.put('/:idR/pedidos/:idP',  PedidoController.update)
router.delete('/:idR/pedidos/:idP',  PedidoController.deleteById)

        //Pedidos (cliente)
//router.get('/:idR/cliente/pedido/:idC', PedidoController.index)
router.post('/:idR/cliente/realizar_pedido', PedidoController.store)

                

module.exports = router

