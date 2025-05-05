const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

exports.upsertNutrisiResponse = async (req, res) => {
  const userId = req.userId;
  
  const {
    q1, q2, q3,
    carbs, proteins, fats, vitamins, minerals,
    p4, p5, p6, p7, p8, p9,
    a1, a2, a3,
    conclusion
  } = req.body;

  try {
    const existing = await prisma.nutrisiResponse.findFirst({
      where: { user_id: userId }
    })

    let result

    if(existing){
      result = await prisma.nutrisiResponse.updateMany({
        where: { user_id: userId },
        data: {
          q1, q2, q3,
          carbs, proteins, fats, vitamins, minerals,
          p4, p5, p6, p7, p8, p9,
          a1, a2, a3,
          conclusion
        }
      })
      if(result.count === 1){
        result = await prisma.nutrisiResponse.findFirst({
          where: { user_id: userId }
        })
      }
    }else{
      result = await prisma.nutrisiResponse.create({
        data: {
          user_id: userId,
          q1, q2, q3,
          carbs, proteins, fats, vitamins, minerals,
          p4, p5, p6, p7, p8, p9,
          a1, a2, a3,
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
      message: 'Failed to update nutrisi response',
      error: {
        code: 'SERVER_ERROR',
        details: error.message
      }
    });
  }
}