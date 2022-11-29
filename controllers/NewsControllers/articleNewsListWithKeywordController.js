const News = require("../../model/News");
const Member = require("../../model/Member");
const responseDataForm = require("../../config/responseDataForm");
const { User } = require("../../config/roles_list");

const getMethod = async (req, res, next) => {
  const getUserId = req.userId;
  try {
    const getUser = await Member.findOne({ userId: getUserId });
    const getKeyword = getUser.interestKeywords;

    let keywordSize = getKeyword.length;
    const resultList = [];

    for (let i = 0; i < keywordSize; i++) {
      let x = getKeyword[i].replace(/#/g, "");
      x = x.replace(/ /g, "");
      const tempResult = await News.find({
        $or: [
          {
            newsTitle: { $regex: x, $options: "i" },
          },
          {
            newsDescription: { $regex: x, $options: "i" },
          },
        ],
      });
      // console.log(tempResult);
      if (tempResult.length > 0) {
        Object.assign(resultList, tempResult);
      }
    }

    // console.log(resultList);

    // console.log(resultList);
    // console.log(resultList);
    // getKeyword.forEach(async (element) => {
    //   let x = element.replace(/#/g, "");
    //   x = x.replace(/ /g, "");
    //   // const tempResult = await News.find({
    //   //   $or: [
    //   //     {
    //   //       // newsTitle: { $regex: x, $options: "i" },
    //   //       newsTitle: { $regex: ".*" + x + ".*" },
    //   //       newsDescription: { $regex: ".*" + x + ".*" },
    //   //     },
    //   //   ],
    //   // });
    //   tempResult = await News.find({
    //     newsTitle: { $regex: ".*" + x + ".*" },
    //   });
    //   if (tempResult != null) {
    //     resultList.push(tempResult);
    //   }
    // });
    // console.log(tempResult);
    const responseData = responseDataForm(
      null,
      "News With Key get request complete",
      resultList
    );
    // console.log("getKeyword:" + getUser.interestKeywords);
    // console.log("newslistKEYWORD:" + result);
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };