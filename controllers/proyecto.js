const Proyecto = require('../models/proyecto')
const { request, response} = require('express')
const TipoProyecto = require('../models/tipoProyecto')
const Cliente = require('../models/cliente')
const Universidad = require('../models/universidad')
const Etapa = require('../models/etapa')


// crear
const createProyecto = async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { 
            tipoProyecto, 
            cliente,
            universidad,
            etapa
        } = data;

        //validando tipoProyecto
        const tipoProyectoDB = TipoProyecto.findOne({
            _id: tipoProyecto._id
        })
        if(!tipoProyectoDB){
            return res.status(400).json({msg: 'tipo Proyecto invalido'})
        }

        // validando cliente
        const clienteDB = Cliente.findOne({
            _id: cliente._id,
        })
        if(!clienteDB){
            return res.status(400).json({msg: 'cliente invalido'})
        }

        //validando universidad
        const universidadBD = Universidad.findOne({
            _id: universidad._id
        })
        if(!universidadBD){
            return res.status(400).json({msg: 'universidad invalida'})
        }

        //validando universidad
        const etapaBD = Etapa.findOne({
            _id: etapa._id
        })
        if(!etapaBD){
            return res.status(400).json({msg: 'etapa invalida'})
        }

        const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyectos = async (req = request, 
    res = response) => {
        try{
            const proyectosDB = await Proyecto.find()
                .populate({
                    path: 'tipoProyecto'
                })
                .populate({
                    path: 'cliente'
                })
                .populate({
                    path: 'universidad'
                })
                .populate({
                    path: 'etapa'
                })
            return res.json(proyectosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

const updateProyectoByID = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaActualizacion = new Date()
        console.log(data)
        const proyecto = await Proyecto.findByIdAndUpdate(id, data, {new: true})
        return res.json(proyecto)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}



module.exports = { 
    createProyecto, 
    getProyectos, 
    updateProyectoByID
}