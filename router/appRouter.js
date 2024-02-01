const express = require  ('express')
const appRouter = express.Router()
const { passport } = require('../auth/auth')

const { Routine, User } = require('../models');


appRouter.get('/profile', passport.authenticate('jwt', { session: false}),
  async(req, res) => {
      res.json({ user: req.user, message: 'authenticated'})
  }
);


  
  // GET all routine
  appRouter.get('/routine', async (req, res) => {
    res.send( await Routine.findAll())
  
  })
  
  // GET one routine
  appRouter.get('/routine/:id', async (req, res) => {
    let routine = await Routine.findByPk(req.params.id)
    res.send(routine)
  
  })

  appRouter.get('/routine/users/famous', async (req, res) => {
    try{
      const users = await User.findAll({
        include: [{
          model: Routine
        }]
  
      })
      res.send(users)

    }catch(error){

      throw error
    }
  })
  appRouter.get('/routine/users/:user_id', async (req, res) => {
    try{
      const users = await User.findByPk(req.params.user_id);
      res.send(users)

    }catch(error){

      throw error
    }
  })
  
  // POST one routine
  appRouter.post('/routine', async (req, res) => {
    try {
      const routine = await Routine.create(req.body);
      res.send(routine)
  
    } catch(e) {
      console.log(e)
    }
  
  })
  
  // PUT(edit) one routine
  appRouter.put('/routines/user/:user_id/update/:routine_id', async (req, res) => {
    let routine = await Routine.findByPk(req.params.routine_id)

    await routine.update(req.body)
    res.send(routine)
  })
  
  // DELETE routine
  appRouter.delete('/routine/:id/delete', async (req, res) => {
    try {
      const routine = await Routine.findByPk(req.params.id);
      if (routine) {
          await routine.destroy();

          console.log("This is my routine: ", routine);
          res.send('ok')
      } else{
          let err = new Error('Routine Not Found')
          res.status(400).send(err.toString())
      } 
  } catch(error) {
      throw error
  }
  });

module.exports = appRouter