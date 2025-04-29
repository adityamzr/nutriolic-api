const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

exports.upsertGame = async (req, res) => {
  const userId = req.userId;
  
  const {
    bmi, littlePlate, bigPlate
  } = req.body;

  try {
    const existing = await prisma.game.findFirst({
      where: { user_id: userId }
    })

    let result

    const updateData = {};

    if (bmi !== undefined) updateData.bmi = bmi;
    if (littlePlate !== undefined) updateData.little_plate = littlePlate;
    if (bigPlate !== undefined) updateData.big_plate = bigPlate;

    if (existing) {
      // Jika ada data yang ingin diupdate, pastikan hanya yang diinputkan yang diupdate
      if (Object.keys(updateData).length > 0) {
        result = await prisma.game.updateMany({
          where: { user_id: userId },
          data: updateData
        });
        if (result.count === 1) {
          result = await prisma.game.findFirst({
            where: { user_id: userId }
          });
        }
      } else {
        result = existing; // Tidak ada perubahan pada data
      }
    } else {
      // Jika belum ada data, buat yang baru dengan input yang ada
      result = await prisma.game.create({
        data: {
          user_id: userId,
          ...updateData
        }
      });
    }

    res.json({
      success: true,
      message: existing ? 'Data berhasil diupdate' : 'Data berhasil dibuat',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update game',
      error: {
        code: 'SERVER_ERROR',
        details: error.message
      }
    });
  }
}
