const {Router} = require('express');
const Inventario = require ('../models/Inventario');

const router = Router();

router.post('/',async function(req, res){
    
    try{

        const existeInventarioPorSerial =await Inventario.findOne({serial:req.body.serial});
        if (existeInventarioPorSerial){
            return res.send('Ya existe el serial para otro equipo');
        }

         let inventario = new Inventario ();
         inventario.serial =req.body.serial;
         inventario.modelo = req.body.modelo;
         inventario.descripcion = req.body.descripcion;
         inventario.foto = req.body.foto;
         inventario.color = req.body.color;
         inventario.fechaCompra = req.body.fechaCompra;
         inventario.precio = req.body.precio;
         inventario.usuario= req.body.usuario._id;
         inventario.marca = req.body.marca._id;
         inventario.tipoEquipo = req.body.tipoEquipo._id;
         inventario.estadoEquipo = req.body.estadoEquipo._id;
         inventario.fechaCreacion = new Date();
         inventario.fechaActualizacion = new Date();

         inventario = await inventario.save();
         res.send(inventario);

    } catch(error){
        console.log(error);
        res.send('Ocurrió un error al crear el inventario');

    }
    
});

router.get('/', async function(req, res){

    try{

        const inventarios = await Inventario.find();
        res.send(inventarios);

    } catch(eror){
        console.log(error);
        res.send('Ocurrió un error al consultar inventarios');
    }
    
});

router.put('/:inventarioId', async function(req, res){
    
    try{

        let inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario){
            return res.send ('No existe el inventario');
        }

        const existeInventarioPorSerial =await Inventario.findOne({serial:req.body.serial, _id: {$ne: inventario._id}});
        if (existeInventarioPorSerial){
            return res.send('Ya existe el serial para otro equipo');
        }

         
         inventario.serial =req.body.serial;
         inventario.modelo = req.body.modelo;
         inventario.descripción = req.body.descripcion;
         inventario.foto = req.body.foto;
         inventario.color = req.body.color;
         inventario.fechaCompra = req.body.fechaCompra;
         inventario.precio = req.body.precio;
         inventario.usuario= req.body.usuario._id;
         inventario.marca = req.body.marca._id;
         inventario.tipoEquipo = req.body.tipoEquipo._id;
         inventario.estadoEquipo = req.body.estadoEquipo._id;
         inventario.fechaActualizacion = new Date();

         inventario = await inventario.save();
         res.send(inventario);

    } catch(error){
        console.log(error);
        res.send('Ocurrió un error al crear el inventario');

    }
});

module.exports =router;