import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const generateGuestToken = (req, res) => {
  const guestId = uuidv4();
  const token = jwt.sign(
    { guestId },
    process.env.JWT_SECRET || 'supersecretdevpulsekey',
    { expiresIn: '365d' } // Token vĩnh viễn (1 năm)
  );
  
  res.status(200).json({
    message: 'Tạo guest token thành công',
    token,
    guestId
  });
};
