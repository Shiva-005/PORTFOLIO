const axios = require('axios');

exports.getGFGProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(
            `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch GFG profile' });
    }
};
