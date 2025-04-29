const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

exports.upsertKaloriResponse = async (req, res) => {
  const userId = req.userId;
  
  const {
    q1, q2, activities, q3, q4, q5, food_items, q6,
    p4, p5, p6, p7, p8,
    conclusion
  } = req.body;

  try {
    const existing = await prisma.kaloriResponse.findFirst({
      where: { user_id: userId }
    })

    let result

    if(existing){
      result = await prisma.kaloriResponse.updateMany({
        data: {
          q1, q2, activities, q3, q4, q5, food_items, q6,
          p4, p5, p6, p7, p8,
          conclusion
        }
      })
      if(result.count === 1){
        result = await prisma.kaloriResponse.findFirst({
          where: { user_id: userId }
        })
      }
    }else{
      result = await prisma.kaloriResponse.create({
        data: {
          user_id: userId,
          q1, q2, activities, q3, q4, q5, food_items, q6,
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
      message: 'Failed to update kalori response',
      error: {
        code: 'SERVER_ERROR',
        details: error.message
      }
    });
  }
}