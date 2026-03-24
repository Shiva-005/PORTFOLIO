const asyncHandler = require('../utils/asyncHandler');
const { getGfgData } = require('../services/gfgService');

exports.getGfgStats = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const data = await getGfgData(username);

    res.status(200).json({
        success: true,
        data,
    });
});