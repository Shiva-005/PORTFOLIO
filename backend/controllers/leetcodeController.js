const asyncHandler = require('../utils/asyncHandler');
const { getLeetCodeData } = require('../services/leetcodeService');

exports.getLeetCodeStats = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({
            success: false,
            message: "Username is required"
        });
    }

    const data = await getLeetCodeData(username);

    res.status(200).json({
        success: true,
        data
    });
});