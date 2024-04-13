const Notification = require('../models/notificationModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all items

const getAll = async (req, res) => {
    const items = await Notification.find({}).sort({ createdAt: -1 })
    res.status(200).json(items)
}


// get single item
const getItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Item Found" })

    }
    const item = await Notification.findById(id)

    if (!item) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    res.status(200).json(item)
}



const getBySenderId = async (req, res) => {
    const { receiverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ error: "Invalid senderId" });
    }

    try {
        const item = await Notification.find({ receiver: receiverId }).sort({ createdAt: -1 });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}






//create a new item
// const createItem = async (req, res) => {
//     const { type, sender, receiver, content } = req.body

//     try {
//         const item = await Notification.create({ type, sender, receiver, content })
//         res.status(200).json(item)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }


const createItem = async (req, res) => {
    const { type, sender, receiver, content, status } = req.body

    try {
        // Check if sender and receiver are valid ObjectId values
        if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
            return res.status(400).json({ error: "Invalid sender or receiver" });
        }

        // Create the notification with references to sender and receiver
        const item = await Notification.create({ type, sender, receiver, content, status });

        // Populate sender and receiver fields with actual user objects
        const populatedItem = await item.populate('sender receiver');

        res.status(200).json(populatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




const deleteByReceiverId = async (req, res) => {
    const { receiverId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ error: "Invalid receiverId" });
    }
    try {
        const item = await Notification.deleteMany({ receiver: receiverId });
        res.status(200).json({ message: `${item.deletedCount} notifications deleted` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteBySenderAndReceiverId = async (req, res) => {
    const { senderId, receiverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ error: "Invalid senderId or receiverId" });
    }

    try {
        const item = await Notification.deleteMany({ sender: senderId, receiver: receiverId });
        res.status(200).json({ message: `${item.deletedCount} notifications deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//update an item
const updateItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Item Found" })
    }
    const item = await Notification.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!item) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    res.status(200).json(item)

}



const updateStatusToSeen = async (req, res) => {
    const { receiverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ error: "Invalid receiverId" });
    }

    try {
        const result = await Notification.updateMany({ receiver: receiverId, status: 'unseen' }, { status: 'seen' });
        res.status(200).json({ message: `Notifications updated to 'seen'` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    getAll,
    getItem,
    getBySenderId,
    createItem,
    deleteByReceiverId,
    deleteBySenderAndReceiverId,
    updateStatusToSeen
}



