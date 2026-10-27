const Message = require('../models/Message');
const createMessage = async (req, res, next) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) { next(error); }
};
module.exports = { createMessage };