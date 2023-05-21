const Etapa = require('../models/etapa')
const { request, response} = require('express')

// crear
const createEtapa = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const etapaBD = await Etapa.findOne({nombre})
        
        if(etapaBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre  
        }
        const etapa = new Etapa(data)
        console.log(etapa)
        await etapa.save()
        return res.status(201).json(etapa)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

const getEtapa = async (req = request, 
    res = response) => {
        try{
            const etapaBD = await Etapa.find()
            return res.json(etapaBD)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}


const updateEtapaByID = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaActualizacion = new Date()
        console.log(data)
        const etapa = await Etapa.findByIdAndUpdate(id, data, {new: true})
        return res.json(etapa)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = { 
    createEtapa, 
    getEtapa,
    updateEtapaByID
}