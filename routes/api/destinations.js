const { Router } = require('express')
const Destination = require('../../models/destination')

const router = Router()

router.get('/', async (req, res) => {
    try{
        const destinations = await Destination.find()
        if(!destinations) throw new Error('No destinations')
        res.status(200).json(destinations)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
    
})

router.post('/', async (req, res) => {
    const newDestination = new Destination(req.body)
    try{
        const destination = await newDestination.save()
        if (!destination) throw new Error('Failed to save the destination')
        res.status(200).json(destination)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const response = await Destination.findByIdAndUpdate(id, req.body)
        if(!response) throw Error('Something went wrong, destination was not updated')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const removed = await Destination.findByIdAndDelete(id)
        if(!removed) throw Error('Something went wrong, destination was not deleted')
        res.status(200).json(removed)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router