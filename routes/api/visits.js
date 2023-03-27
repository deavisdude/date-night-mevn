const { Router } = require('express')
const Destination = require('../../models/destination')
const User = require('../../models/user')
const Visit = require('../../models/visit')

const router = Router()

router.get('/', async (req, res) => {
    try{
        const visits = await Visit.find()
        if(!visits) throw new Error('No visits')
        res.status(200).json(visits)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.get('/:user', async (req, res) => {
    try{
        const user = await User.findOne({username: req.params.user}).populate('visits')
        if (!user) {
            // If user is not found, create a new user and save it to the database
            const newUser = new User({user_id: req.params.user})
            await newUser.save()
            res.status(200).json([])
        } else {
            const visits = user.visits
            if(!visits) throw new Error('No visits')
            res.status(200).json(visits)
        }
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.post('/:user', async (req, res) => {
    try {
      const user = await User.findOne({ user_id: req.params.user }).populate('visits')
      if (!user) {
        // If user is not found, create a new user and save it to the database
        const newUser = new User({ user_id: req.params.user });
        const newVisit = new Visit(req.body)
        await newVisit.save();
        newUser.visits.push(newVisit);
        await newUser.save();
        res.status(200).json(newUser.visits);
      } else {
        const newVisit = new Visit(req.body)
        console.log(req.body)
        await newVisit.save();
        user.visits.push(newVisit);
        await user.save();
        res.status(200).json(user.visits);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const removed = await Visit.findByIdAndDelete(id)
        if(!removed) throw Error('Something went wrong, visit was not deleted')
        res.status(200).json(removed)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router