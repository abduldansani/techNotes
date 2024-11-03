const User = require('../models/User')
const bcrypt = require('bcrypt')
const Note = require('../models/Note')

async function getAllUsers(req, res) {
    try {
        const users = await User.find().select('-password').lean()
        if(!users || users.length === 0) {
            return res.status(400).json({message: "No users found!"})
        }
        res.status(200).json(users)
    } catch(err) {
        console.error('Error fetching users:', err)
        res.status(500).json({message: 'An error occured while fetching users'})
    }
}

async function createNewUser(req, res) {
    const {username, password, roles = ["Employee"]} = req.body
    if(!username || !password) {
        return res.status(400).json({message: 'Username and password are required'})
    }
    
    try {
        const duplicate = await User.findOne({ username }).lean().exec()
        if(duplicate) {
            return res.status(409).json({message: `user ${username} already exists`})
        }

        const hashedPwd = await bcrypt.hash(password, 10)

        const userObject = {username, password: hashedPwd, roles}
        const user = await User.create(userObject)
        if(user) {
            res.status(201).json({message: `new user ${username} created successfully`})
        } else {
            res.status(400).json({message: 'invalid user data received'})
        }
    } catch(err) {
        console.error('Error creating user', err)
        res.status(500).json({message: 'An error occured while creating user'})
    }
    // res.status(200).json({message: `new user ${username} created successfully`})
}

async function updateUser(req, res) {
    const { id, ...updates} = req.body

    if(!id) {
        return res.status(400).json({message: 'user Id is required'})
    }

    try {
        const user = await User.findById(id).exec()
        if(!user) {
            return res.status(404).json({message: 'user not found'})
        }

        if(updates.username) {
            const duplicate = await User.findOne({username: updates.username}).lean().exec()
            if(duplicate && duplicate._id.toString() !== id) {
                return res.status(400).json({message: 'username is already taken'})
            }
        }

        if(updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10)
        }

        // Object.assign(user, updates)
        // const updatedUser = await user.save()

        // const updatedUserData = { user, ...updates };
        // const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true }).exec();
		const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).exec()

        res.status(200).json({message: `user ${updatedUser.username} updated successfully`})

    } catch(err) {
        console.error('Error updating user:', err)
        res.status(500).json({message: 'an error ocured while updating the user'})
    }
}

async function deleteUser(req, res) {
    const {id} = req.body

    if(!id) {
        return res.status(400).json({message: 'user ID is required'})
    }

    const note = await Note.findOne({user: id}).lean().exec()
    if(note) {
        return res.status(400).json({message: 'user has assigned notes'})
    }

	try {
		const user = await User.findById(id).exec()
   		if(!user) {
			return res.status(400).json({message: 'user not found'})
		}

		const reply = await user.deleteOne()
    	res.json(reply)

	} catch(err) {
		console.err('Error deleting user', err)
		res.status(500).json({message: 'an error occured while deleting user'})
	}
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}