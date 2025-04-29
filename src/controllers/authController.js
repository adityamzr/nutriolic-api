const { PrismaClient } = require('@prisma/client');
const jwt = require('../utils/jwt');
const prisma = new PrismaClient();

exports.auth = async (req, res) => {
  const { username, class: userClass } = req.body;

  if (!username || !userClass) {
    return res.status(400).json({
      success: false,
      message: 'Username dan Kelas harus diisi',
    });
  }

  try {
    const userExist = await prisma.user.findFirst({
      where: { 
        username,
        class: userClass
      },
    });

    if (userExist) {
      if (userExist.progress === 4) {
        return res.status(400).json({
          success: false,
          message: 'Akun sudah pernah dipakai',
          error: {
            code: 400,
            details: 'Account already in use'
          }
        });
      }
    
      const token = jwt.signToken({ userId: userExist.id, username: userExist.username });
      return res.status(200).json({
        success: true,
        message: 'Account logged in successfully',
        token
      });
    }
    
    // Buat akun baru jika belum ada
    const newUser = await prisma.user.create({
      data: {
        username,
        class: userClass,
        is_admin: false,
        progress: 0
      },
    });
    
    const token = jwt.signToken({ userId: newUser.id, username: newUser.username });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};
