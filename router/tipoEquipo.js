const {Router} = require('express');
const tipoEquipo = require('../models/TipoEquipo');
const TipoEquipo = require ('../models/TipoEquipo');
const {validarTipoequipo} = require ('../helpers/validar-tipoEquipo');

const router = Router();

router.post('/',async function(req, res){
    
    try{

        const validaciones= validarTipoequipo(req);

        if (validaciones.length >0){
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);
        console.log(tipoEquipo);

    }catch (error){
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el tipo de Equipo');

    }
    
    
});

router.get('/', async function(req, res){
    
    try{
        const tipoEquipos= await TipoEquipo.find();
        res.send(tipoEquipos);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un eror');
    }

});

router.put('/:tipoEquipoId', async function(req, res){
   
    try{

        const validaciones= validarTipoequipo(req);

        if (validaciones.length >0){
            return res.status(400).send(validaciones);
        }
        
        let tipoEquipo =  await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo){
            return res.status(400).send(`No existe tipo Equipo`);
        }
        
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();
        
        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);
        

    }catch (error){
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el tipo de Equipo');

    }
});

module.exports =router;