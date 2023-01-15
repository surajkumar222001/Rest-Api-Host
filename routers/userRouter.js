const  express = require('express');
const User = require("../models/User");
const router = express.Router();
const  {body,validationResult} = require('express-validator');

/*
user Router
Usage : Register a User
URL :http://127.0.0.1:5000/api/users/insert
parameters : name ,email,password
methode : post
access : public
*/

router.post('/insert' ,[
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('role').notEmpty().withMessage('role is required'),
    body('status').notEmpty().withMessage('status is required'),
    body('avatar').notEmpty().withMessage('avatar is required'),
    body('lastLogin').notEmpty().withMessage('lastLogin is required')
] ,async (request,response) => {
    let error =validationResult(request)
    if (!error.isEmpty()){
        return response.status(401).json({error : error.array()})
    }
    try{
        let {name, email , role,status,avatar ,lastLogin} = request.body;
        // save to db

         let  user = new User({name, email , role,status,avatar ,lastLogin});
         user = await  user.save();


         response.status(200).json({
             message : 'registration is successful'
         })


    }
    catch (error) {
        console.error(error)
        response.json({
            error : [{message : error.message}]
        })
    }
});

/*
user Router
Usage : update a User
URL :http://127.0.0.1:5000/api/users/update
methode : put
access : public

*/

router.put('/update/:id' ,  [
    body('name').notEmpty().withMessage('enter name'),
    body('role').notEmpty().withMessage('enter role')
    ],
     async (request,response) => {
         let error = validationResult(request);
         if (!error.isEmpty()){
             return response.status(401).json({error : error.array()})
         }
         try{

        let {name,role} = request.body;
        //check user is exist or not
               
        // let user = await User.findById(request.params.id);
        // if (!user){
        //     return response.status(401).json([{message : 'invalid user'}])
        // }
          let  user = await User.findOneAndUpdate({_id:request.params.id }, {
               $set:{
                name : name,
                role : role
               }
             });

             let userResponse = user;

            
        response.status(200).json({
            userResponse:userResponse
        })


    }
    catch (error) {
        console.error(error)
        response.json({
            error : [{message : error.message}]
        })
    }
});




/*


//findandDelete()


*/
router.delete('/delete/:id',async (request,response) => {
         
         try{
            
        //check user is exist or not        
        let user = await User.findByIdAndDelete( request.params.id);
        if (!user){
            return response.status(401).json([{message : 'user not find user'}])
        }  
        response.status(200).json({
            user:user,
            message : "Delete Successful"
        })
    }
    catch (error) {
        console.error(error)
        response.json({
            error : [{message : error.message}]
        })
    }
});

/*
user Router
Usage : Get User
URL :http://127.0.0.1:5000/api/users/
parameters : no filed required
methode : get
access : Private

*/
router.get('/',async (request , response) => {

    try {

        let user = await User.find();
        response.status(200).json({user : user});

    }
    catch(error) {
        console.log(error);
        return response.status(500).json({
            error : [{message : error.message}]
        })
    }
})

module.exports = router



