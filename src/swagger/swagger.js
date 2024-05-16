const swaggerAutogen = require('swagger-autogen')

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('../server')               
}).catch(() => {
    console.error('Erro')
})
