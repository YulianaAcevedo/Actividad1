const {Router} = require('express');
const EstadoEquipo = require ('../models/EstadoEquipo');

const router = Router();

router.post('/',async function(req, res){
    
    try{
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);
        console.log(estadoEquipo);

    }catch (error){
        console.log(error);
        res.send('Ocurrió un error al crear el estado de Equipo');

    }
    
    
});

router.get('/', async function(req, res){
    
    try{
        const estadoEquipos= await EstadoEquipo.find();
        res.send(estadoEquipos);

    } catch(error){
        console.log(error);
        res.send('Ocurrió un eror');
    }

});

router.put('/:estadoEquipoId', async function(req, res){
   
    try{

        let estadoEquipo =  await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo){
            return res.send(`No existe estado Equipo`);
        }
        
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
        
        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);
        

    }catch (error){
        console.log(error);
        res.send('Ocurrió un error al crear el estado de Equipo');

    }
});

module.exports =router;