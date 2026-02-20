import User from '../models/userModel.js'
import bcrypt from 'bcrypt'


export const getUsers = async (req, res, next) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Failed to get users" })
    }

}



export const getUser = async (req, res, next) => {
    const id = req.params.id;
    try {
const user = await User.findById({_id:id})
res.status(200).json(user)

    } catch (error) {
        next(error)
        res.status(500).json({ message: "Failed to get user" })
    }

}





export const updateUser = async (req, res, next) =>{
    try {
        const userId = req.params.id;
        if (req.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this user."
            })
        };
        const {username, email, password, avatar} = req.body;
       

        const updateData ={};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (avatar) updateData.avatar = avatar;
        if (password) {
         updateData.password = await bcrypt.hash(password, 10) 

         };

         const updatedUser = await User.findByIdAndUpdate(userId, {$set: updateData}, {new:true})
         if(!updatedUser) {
            return res.status(404).json({
                success:false,
                message: "User not found"
            })
         }
     const {password: pass, ...userInfo} = updatedUser._doc
     res.status(200).json({
     success: true,
     message: "User updated",
     userInfo
})
        
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const tokenUserId = req.user.id;

    if (id !== tokenUserId) {
        return res.status(403).json({message: "Not authorized"})
    }
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message: "User deleted  successfully"})

    } catch (error) {

        next(error)
        res.status(500).json({ message: "Failed to remove user" })
    }

}

export const savePost = async (req, res, next) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;
    
    try {
        const savedPost = await savePost.findById({userId_postId: {userId: tokenUserId, postId}})
        if(savePost) {
            await savedPost.delete({id: savedPost.id})
            res.status(200).json({message: "post deleted  from saved post"})
        }
        else {
            await savedPost.create({userId: tokenUserId, postId})
            res.status(200).json({message :"post saved"})
        }



    } catch (error) {

        next(error)
        res.status(500).json({ message: "Failed to remove post" })
    }

}             