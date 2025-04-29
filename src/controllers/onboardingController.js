const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

exports.upsertOnboarding = async (req, res) => {
  const userId = req.userId;
  
  const { response } = req.body;

  try {
    const existing = await prisma.onboarding.findFirst({
      where: { user_id: userId }
    })

    let result

    if(existing){
      result = await prisma.onboarding.updateMany({
        where: { user_id: userId },
        data: { response }
      })
      if(result.count === 1){
        result = await prisma.onboarding.findFirst({
          where: { user_id: userId }
        })
      }
    }else{
      result = await prisma.onboarding.create({
        data: {
          user_id: userId,
          response
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
      message: 'Failed to update onboarding',
      error: {
        code: 'SERVER_ERROR',
        details: error.message
      }
    });
  }
}