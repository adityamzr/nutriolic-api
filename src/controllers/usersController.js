const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

exports.getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        is_admin: false
      }
    });
    res.json({
      success: true,
      message: 'Data berhasil diambil',
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get users',
      error: {
        code: 'SERVER_ERROR',
        details: error.message
      }
    })
  }
}

exports.getUserDetail = async (req, res) => {
  const userId = Number(req.params.id)

  try {
    const [userDetail, onboarding, nutrisi, kalori, gizi, piringku, game, refleksi] = await Promise.all([
      prisma.user.findFirst({ where: { id: userId } }),
      prisma.onboarding.findFirst({ where: { user_id: userId } }),
      prisma.nutrisiResponse.findFirst({ where: { user_id: userId } }),
      prisma.kaloriResponse.findFirst({ where: { user_id: userId } }),
      prisma.giziResponse.findFirst({ where: { user_id: userId } }),
      prisma.piringkuResponse.findFirst({ where: { user_id: userId } }),
      prisma.game.findFirst({ where: { user_id: userId } }),
      prisma.reflection.findFirst({ where: { user_id: userId } }),
    ]);

    const [nutrisiQuiz, kaloriQuiz, giziQuiz, piringkuQuiz] = await Promise.all([
      prisma.quizResponse.findMany({ where: { user_id: userId, question_id: { in: [1,2,3,4,5] } } }),
      prisma.quizResponse.findMany({ where: { user_id: userId, question_id: { in: [6,7,8,9,10]}  } }),
      prisma.quizResponse.findMany({ where: { user_id: userId, question_id: { in: [11,12,13,14,15]} } }),
      prisma.quizResponse.findMany({ where: { user_id: userId, question_id: { in: [16,17,18,19,20]} } }),
    ]);

    res.json({
      success: true,
      message: 'Detail user berhasil diambil',
      data: {
        user: userDetail,
        onboarding: onboarding,
        nutrisi: nutrisi,
        kalori: kalori,
        gizi: gizi,
        piringku: piringku,
        game: game,
        refleksi: refleksi,
        nutrisiQuiz: nutrisiQuiz,
        kaloriQuiz: kaloriQuiz,
        giziQuiz: giziQuiz,
        piringkuQuiz: piringkuQuiz,
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get users',
      error: {
        code: 'SERVER_ERROR',
        details: error.message
      }
    })
  }
}