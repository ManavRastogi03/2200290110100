const axios = require('axios');

const register = async () => {
  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/register',
      {
        email: "manav.2226csit1046@kiet.edu",
        name: "Manav Rastogi",
        mobileNo: "9528321676",
        githubUsername: "ManavRastogi03",
        rollNo: "2200290110100",
        collegeName: "Kiet Group of Institutions",
        accessCode: "SxVeja"
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("✅ Registration Successful:\n", response.data);
  } catch (err) {
    console.error("❌ Registration Failed:", err.response?.data || err.message);
  }
};

register();