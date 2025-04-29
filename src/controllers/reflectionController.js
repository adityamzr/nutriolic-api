const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

exports.upsertReflection = async (req, res) => {
  const userId = req.userId;
  
  const {
    pesan, kesan, saran
  } = req.body;

  try {
    const existing = await prisma.reflection.findFirst({
      where: { user_id: userId }
    })

    let result

    if(existing){
      result = await prisma.reflection.updateMany({
        where: { user_id: userId },
        data: {
          pesan,
          kesan,
          saran
        }
      })
      if(result.count === 1){
        result = await prisma.reflection.findFirst({
          where: { user_id: userId }
        })
      }
    }else{
      result = await prisma.reflection.create({
        data: {
          user_id: userId,
          pesan,
          kesan,
          saran
        }
      })
    }

    res.json({
      success: true,
      message: existing ? 'Data berhasil diupdate' : 'Data berhasil dibuat',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update reflection',
      error: {
        code: 'SERVER_ERROR',
        details: error.message
      }
    });
  }
}
