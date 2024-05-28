
const bcrypt = require('bcrypt')
// const UsersModel = require('../model/UsersModel')
// const { Types } = require('mongoose')

const LogInCollection = require('../config/userdb');
const { response } = require('../app');

const getAllUasers = ()=>{
    return new Promise(async(resolve,reject)=>{
        let allUsers = await LogInCollection.find({},{_id:1,name:1,email:1}).lean().exec()
        resolve(allUsers)
    })
}

const deleteUser = (userId)=>{
        return new Promise((resolve,reject)=>{
            LogInCollection.deleteOne({_id:userId}).then(()=>{
                resolve()
            })
        })
}

const getUser = (userId)=>{
    return new Promise(async(resolve,reject)=>{
        let userData = await LogInCollection.findOne({_id:userId})
            resolve(userData)
        
    })
}

const updateUser = (userId,userDetails)=>{
    return new Promise(async(resolve,reject)=>{
        let hashedPassword;
        if(userDetails.password !==''){
        hashedPassword= await bcrypt.hash(userDetails.password, 10)
        }
        LogInCollection.updateOne({_id:userId},
            {
                $set:{
                    name:userDetails.name,
                    email:userDetails.email,
                    password: hashedPassword
                }
            }
        ).then((response)=>{
            resolve()
        })
    })
}



// // * create user
// const createUserController = async (req, res) => {
//   const { email, password, name } = req.body
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const user = {
//       name,
//       email,
//       password: hashedPassword
//     }
//     console.log(user)
//     // const duplicates = await UsersModel.findOne({ email: email })
//     // if (duplicates) return res.status(409).json({ message: "email already exists" })
//     const result = await UsersModel.create(user)
//     console.log(`${result.email} created success`)
//     res.status(200).json({ message: `user created` })

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "error creating user" })
//   }
// }

// // * update user 
// const updateUserController = async (req, res) => {
//   const { email, password, firstname, lastname, _id } = req.body
//   console.log(req.body)
//   try {
//     if (_id === '' && email === '') {
//       res.status(400).json({ message: "email or _id required" })
//     }

//     const createUserObj = async () => {
//       return {
//         email: email !== '' ? email : foundUser.email,
//         firstname: firstname !== '' ? firstname : foundUser.firstname,
//         lastname: lastname !== '' ? lastname : foundUser.lastname,
//         password: password !== '' ? await bcrypt.hash(password, 10) : foundUser.password
//       }
//     }

//     let foundUser
//     let result
//     if (_id !== '' && Types.ObjectId.isValid(_id)) {
//       foundUser = await UsersModel.find({ _id: _id })
//       const user = await createUserObj()
//       console.log(user)
//       result = await UsersModel.updateOne(
//         { _id: _id },
//         user
//       )
//     } else if (email !== '') {
//       foundUser = await UsersModel.find({ email: email })
//       const user = await createUserObj()
//       console.log(user)
//       result = await UsersModel.updateOne(
//         { email: email },
//         user
//       )
//     }
//     console.log("result")
//     console.log(result)
//     if (result.modifiedCount === 1) {
//       return res.status(200).json({ message: `user updated` })
//     }
//     return res.status(400).json({ message: "email or _id required " })

//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "update user failed" })
//   }
// }


// // * delete user
// const deleteUserController = async (req, res) => {
//   const { email, _id } = req.body
//   try {
//     if (_id === '' && email === '') {
//       res.status(400).json({ message: "email or _id required" })
//     }

//     let result
//     if (_id !== '' && Types.ObjectId.isValid(_id)) {
//       result = await UsersModel.deleteOne({ _id: _id })
//     } else if (email !== '') {
//       result = await UsersModel.deleteOne({ email: email })
//     }
//     console.log("result")
//     console.log(result)
//     if (result?.deletedCount === 0) {
//       return res.status(404).json({ message: `user not found` })
//     }
//     if (result?.deletedCount === 1) {
//       return res.status(200).json({ message: `user deleted` })
//     }
//     return res.status(400).json({ message: "email or _id required " })
//   } catch (error) {
//     res.status(500).json({ message: "delete user failed" })
//     console.log(error)
//   }
// }










module.exports = {
    getAllUasers,
    deleteUser,
    getUser,
    updateUser 
//   createUserController
// //   updateUserController,
// //   deleteUserController
}


