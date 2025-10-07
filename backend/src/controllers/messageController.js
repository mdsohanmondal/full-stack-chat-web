import Message from '../models/MessageModel.js';
export const sendMessage = async (req, res) => {
  try {
    const { content, sender, receiver } = req.body;
    //   checking body items
    if (!content || !sender || !receiver) {
      return res.status(400).json({ message: 'Input fields are missing' });
    }

    const message = await Message.create({
      content,
      receiver,
      sender,
    });

    return res.status(201).json({ message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'Missing id' });
  }
  //   const messages1 = await
  //   const messages2 = await
  const [messages1, messages2] = await Promise.all([
    Message.find({ conversationId: `${senderId}:${receiverId}` }),
    Message.find({ conversationId: `${receiverId}:${senderId}` }),
  ]);

  const allMessage = [...messages1, ...messages2];

  return res.json(allMessage);
};

export const getAllMessages = async (req, res) => {
  const messages = await Message.find({});
  return res.json(messages);
};
