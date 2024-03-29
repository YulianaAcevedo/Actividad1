const {Router} = require('express');
const Marca = require('../models/Marca');
const {validarTipomarca} = require ('../helpers/validar-tipoMarca');

const router = Router();

router.post('/',async function(req, res){
    

    try{

        const validaciones= validarTipomarca(req);

        if (validaciones.length >0){
            return res.status(400).send(validaciones);
        }



        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
        marca = await marca.save();

        res.send(marca);
        console.log(marca);

    }catch (error){
        console.log(error);
        res.status(500).send('Ocurrió un error al crear la amrca');

    }
    
});

router.get('/', async function(req, res){
    try{
        const marcas= await Marca.find();
        res.send(marcas);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un eror');
    }
    
});

router.put('/:marcaId', async function(req, res){
    try{
        const validaciones= validarTipomarca(req);

        if (validaciones.length >0){
            return res.status(400).send(validaciones);
        }



        let marca = await Marca.findById(req.params.marcaId);
        if (!marca){
            return res.status(400).send('Marca no existe');
        }

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();
        
        marca = await marca.save();

        res.send(marca);
        

    }catch (error){
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar la marca');

    }
});

module.exports =router;