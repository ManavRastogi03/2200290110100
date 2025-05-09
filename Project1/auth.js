const axios = require('axios');

const getAuthToken = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/evaluation-service/auth', {
        email: "manav.2226csit1046@kiet.edu",
        name: "Manav Rastogi",
        mobileNo: "9528321676",
        githubUsername: "ManavRastogi03",
        rollNo: "2200290110100",
        collegeName: "Kiet Group of Institutions",
        accessCode: "SxVeja"
      });

    console.log("✅ Token fetched successfully");
    return response.data.access_token;
  } catch (err) {
    console.error("❌ Auth Failed:", err.response?.data || err.message);
  }
};

module.exports = getAuthToken;