const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

exports.upsertGiziResponse = async (req, res) => {
  const userId = req.userId;
  
  const {
    q1, q2, q3,
    p4, p5, p6, p7, p8,
    conclusion
  } = req.body;

  try {
    const existing = await prisma.giziResponse.findFirst({
      where: { user_id: userId }
    })

    let result

    if(existing){
      result = await prisma.giziResponse.updateMany({
        data: {
          q1, q2, q3,
          p4, p5, p6, p7, p8,
          conclusion
        }
      })
      if(result.count === 1){
        result = await prisma.giziResponse.findFirst({
          where: { user_id: userId }
        })
      }
    }else{
      result = await prisma.giziResponse.create({
        data: {
          user_id: userId,
          q1, q2, q3,
          p4, p5, p6, p7, p8,
          conclusion
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
      message: 'Failed to update gizi response',
      error: {
        code: 'SERVER_ERROR',
        details: error.message
      }
    });
  }
}