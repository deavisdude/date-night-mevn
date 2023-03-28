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
        const user = await User.findOne({username: req.params.user})
        if (!user) {
            // If user is not found, create a new user and save it to the database
            const newUser = new User({user_id: req.params.user})
            await newUser.save()
            res.status(200).json([])
        } else {
            const visits = await Visit.find({ user: user._id })
                .populate('destination', 'name address rating cuisine')
                .populate('user', 'user_id')
                .exec();
            if(!visits) throw new Error('No visits')
            res.status(200).json(visits)
        }
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.post('/:user', async (req, res) => {
    let destinationToUpdate
    try {
      const user = await User.findOne({ user_id: req.params.user }).populate('visits')
      if (!user) {
        // If user is not found, create a new user and save it to the database
        const newUser = new User({ user_id: req.params.user });
        const json = req.body
        json.user = newUser._id
        if(json.destination != ''){
            const destination = await Destination.findOne({ name: json.destination})
            if(destination){
                destinationToUpdate = destination
                json.destination = destination._id
            }else{
                const newDestination = new Destination({ name: json.destination })
                await newDestination.save()
                destinationToUpdate = newDestination
                json.destination = newDestination._id
            }
        }
        const newVisit = new Visit(json)
        await newVisit.save();
        destinationToUpdate.visits.push(newVisit._id)
        await destinationToUpdate.updateRating()
        newUser.visits.push(newVisit);
        await newUser.save();
        res.status(200).json(newUser.visits);
      } else {
        const json = req.body
        json.user = user._id
        if(json.destination != ''){
            const destination = await Destination.findOne({ name: json.destination})
            if(destination){
                destinationToUpdate = destination
                json.destination = destination._id
            }else{
                const newDestination = new Destination({ name: json.destination })
                await newDestination.save()
                destinationToUpdate = newDestination
                json.destination = newDestination._id
            }
        }
        const newVisit = new Visit(json)
        await newVisit.save();
        destinationToUpdate.visits.push(newVisit._id)
        await destinationToUpdate.updateRating()
        user.visits.push(newVisit);
        await user.save();
        res.status(200).json(user.visits);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const destinationToUpdate =  await Destination.findOne(req.body.destination)
        const response = await Visit.findByIdAndUpdate(id, req.body)
        if(!response) throw Error('Something went wrong, destination was not updated')
        const updated = { ...response._doc, ...req.body }
        await destinationToUpdate.updateRating()
        res.status(200).json(updated)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const removed = await Visit.findByIdAndDelete(id)
        if(!removed) throw Error('Something went wrong, visit was not deleted')
        const destination = await Destination.findById(removed.destination);
        destination.visits.pull(id);
        await destination.updateRating()
        res.status(200).json(removed)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router