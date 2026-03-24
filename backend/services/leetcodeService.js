const axios = require('axios');

const getLeetCodeData = async (username) => {
    try {
        const response = await axios.post(
            'https://leetcode.com/graphql',
            {
                query: `
                query getUserProfile($username: String!) {
                  matchedUser(username: $username) {
                    username
                    profile {
                      ranking
                    }
                    submitStats {
                      acSubmissionNum {
                        difficulty
                        count
                      }
                    }
                  }
                  userContestRanking(username: $username) {
                    rating
                    globalRanking
                    attendedContestsCount
                  }
                }
                `,
                variables: { username }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const user = response.data.data.matchedUser;
        const contest = response.data.data.userContestRanking;

        if (!user) {
            throw new Error('User not found');
        }

        const stats = user.submitStats.acSubmissionNum;

        return {
            username: user.username,

            // 🔥 Problem Stats
            totalSolved: stats[0].count,
            easySolved: stats[1].count,
            mediumSolved: stats[2].count,
            hardSolved: stats[3].count,

            // 🔥 Profile Ranking
            globalRanking: user.profile?.ranking || null,

            // 🔥 Contest Data
            contestRating: contest?.rating || null,
            contestGlobalRanking: contest?.globalRanking || null,
            contestsAttended: contest?.attendedContestsCount || 0,
        };

    } catch (error) {
        console.error("LeetCode Error:", error.response?.data || error.message);
        throw new Error('Failed to fetch LeetCode data');
    }
};

module.exports = { getLeetCodeData };