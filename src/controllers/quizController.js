const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

exports.upsertQuiz = async (req, res) => {
  const userId = req.userId;
  
  const {
    questionId, response, score
  } = req.body;

  try {
    const existing = await prisma.quizResponse.findFirst({
      where: { user_id: userId, question_id: questionId }
    })

    let result

    if(existing){
      result = await prisma.quizResponse.updateMany({
        where: { user_id: userId, question_id: questionId },
        data: {
          response,
          score
        }
      })
      if(result.count === 1){
        result = await prisma.quizResponse.findFirst({
          where: { user_id: userId, question_id: questionId }
        })
      }
    }else{
      result = await prisma.quizResponse.create({
        data: {
          user_id: userId,
          question_id: questionId,
          response: response,
          score: score
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
