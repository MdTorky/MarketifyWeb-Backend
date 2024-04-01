const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')


const accessChat = async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        return res.status(404).json({ error: "No Such User" })
    }
    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-userPassword").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "userFname userImage userEmail",
    });

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            users: [req.user._id, userId]
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-userPassword")

            res.status(200).json(FullChat)

        } catch (error) {
            res.status(400).json({ error: error.message })


        }
    }
}






const fetchChats = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-userPassword")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "userFname userImage userEmail",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

module.exports = {
    accessChat,
    fetchChats
}
