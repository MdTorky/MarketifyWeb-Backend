const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const Message = require('../models/messageModel')
const mongoose = require('mongoose')



const getAll = async (req, res) => {

    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "userFname userImage userEmail")
            .populate("chat")

        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}


const sendMessage = async (req, res) => {
    const { content, chatId } = req.body


    if (!content || !chatId) {
        return res.status(404).json({ error: "Invalid Data" })
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender", "userFname userImage")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "userFname userImage userEmail"
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })
        res.status(200).json(message)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}




module.exports = {
    getAll,
    sendMessage
}