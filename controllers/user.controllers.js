const db = require('../models');
const User = require('../models/user')(db.sequelize, db.Sequelize);



const getAllUserData = async (req, res) => {
  // #swagger.tags = ['User data']
  /* #swagger.responses[200] = {
            description: 'User get successfully.',
            schema: { $ref: '#/definitions/User' }
    } */
  
    await User.findAll({ where: { email: req.params.email } }).then((user) => {
      
 res.status(200).json(user);
    }).catch((error) => {
       res.status(500).send(error.message);
    })

   
  
};

const createUserData = async  (req, res) => {
 
  // #swagger.tags = ['User data']
   /*  #swagger.parameters['obj'] = {
            in:'body',
              required: 'true',
            description: 'Create user data',
            schema: { $ref: '#/definitions/AddUser' }
           
    } */
  
  
    
  const { name, phone, email } = req.body;

  if(!req.file){

     await User.create({
       name: name,
      phone: phone,
      email: email,
      image:null,
  }).then((user) => {
    res.status(200).json(user);
    
  }).catch((error) => {
    res.status(500).send(error.message);
  })
  }else{
 await User.create({
       name: name,
      phone: phone,
      email: email,
      image:req.file.path,
  }).then((user) => {
    res.status(200).json(user);
    
  }).catch((error) => {
    res.status(500).send(error.message);
  })
  }
 
   
   
       

  

  
  
};

const updateUserData = async (req, res) => {
  // #swagger.tags = ['User data']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Update user data.',
                schema: { $ref: '#/definitions/UpdateUser' }
        } */
 
  try {
    const userUpdate = await User.findOne({where:{id: req.params.id }});
    userUpdate.name = req.body.name;
    userUpdate.phone = req.body.phone;

    await userUpdate.save();
    res.status(201).json(userUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUserData = async (req, res) => {
  // #swagger.tags = ['User data']

  await User.destroy({ where: { id: req.params.id } }).then((user) => {
    
    res.status(200).json(user===1&&req.params.id)
  }).catch((error) => {
    res.status(500).json({message:'User not find and not delete user'})
  })
 
};

module.exports = {
  getAllUserData,
  createUserData,
  updateUserData,
  deleteUserData,
};
