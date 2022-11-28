const Member = require("../../model/Member");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    const getMemberId = req.params.memberId;

    if (!getMemberId) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const result = await Member.findById(getMemberId);

        const responseData = responseDataForm(null, "adminMember delete request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

const deleteMethod = async (req, res, next) => {
    const getMemberId = req.params.memberId;

    if (!getMemberId) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const result = await Member.findByIdAndDelete(getMemberId);
        console.log(result);

        const responseData = responseDataForm("/memberlist", "adminMember delete request complete", null);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod, deleteMethod }