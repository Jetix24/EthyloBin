// pages/api/users/[id].js
import connectMongo from '@/libs/mongoose';
import User from '@/models/User';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await connectMongo();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;
    default:
      res.status(400).json({ message: 'Method not allowed' });
      break;
  }
}
