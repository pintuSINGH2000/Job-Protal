const JWT = require("jsonwebtoken");

const verifyTocken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status().send({ errorMessage: "Unauthorized access" });
    }
    const decode = JWT.verify(token, process.env.SECRET_KEY);
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ errorMessage: "Unauthorized access! Invalid token" });
  }
};

module.exports = {
    verifyTocken
}
// http://localhost:8080/api/v1/job/create-job
// {
//     "companyName":"Google",
//     "logoUrl":"https://lh3.googleusercontent.com/d_S5gxu_S1P6NR1gXeMthZeBzkrQMHdI5uvXrpn3nfJuXpCjlqhLQKH_hbOxTHxFhp5WugVOEcl4WDrv9rmKBDOMExhKU5KmmLFQVg",
//     "jobPosition":"Software Developer",
//     "salary":"1000000",
//     "jobType":"Full Time",
//     "locationType":"Work From Office",
//     "location":"bengaluru",
//     "jobDescription":"dsnfas;dnfu;adfas fioadf asdfasdfajdsfnadsjfnasd fsajdf.",
//     "companyDescription": "dof sadlfadmfnasdf isf fdsaf asdfjadsf dsjfnasd fdsjkfnas ddf.",
//     "information":"kaf fadsf sadf afjkadsf",
//     "duration":"all time",
//     "skills": ["React","Node","Mongoose","express"]
//   }
