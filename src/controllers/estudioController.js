const mongoose = require('mongoose')
const Estudio = require('../models/estudio')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split('')[1]
  console.log(token)

  if(!token){
    return re.status(403).send({message: "Kd a authorizationnnn !!! \o/"})
  }

  jwt.verify(token, SECRET, async (err) => {
    if(err){
      res.status(403).send({message: 'Token não é valido', err})
    }
  })
  
  const estudios = await Estudio.find()
  res.json(estudios)
}

const createStudio = async (req, res) => {
  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })
  const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
  if (estudioJaExiste) {
    return res.status(409).json({error: 'Estudio ja cadastrado.'})
  }
  try{
    const novoEstudio = await estudio.save()
    res.status(201).json(novoEstudio)
  } catch(err) {
    res.status(400).json({ message: err.message})
  }
}

const updateEstudio = async (req,res) => {

  try{
    const estudio = await Estudio.findById(req.params.id)
    if(estudio == null){
      return res.status(404).json({message: "estudio nao encontrado"})
    }

    if(req.body.nome != null){
      estudio.nome = req.body.nome
    }

    const estudioAtualizado = await estudio.save()
    return status(200).json(estudioAtualizado)


  } catch (err){
    res.status(500).json({message: err.message})
  }
}


const deleteEstudio = async(req, res) => {
  try{
    const estudio = await Estudio.findById(req.params.id)
    if(estudio == null){
      return res.status(404).json({message: "Estudio não encontrado"})
    }

    estudio.remove()
    res.status(200).json({message: "Estudio removido com sucesso"})


  } catch (err){
    res.status(500).json({message: err.message})
  }
}


module.exports = {getAll,
  createStudio, 
  updateEstudio, 
  deleteEstudio}