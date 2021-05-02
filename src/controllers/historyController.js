const historyService = require('../services/historyService');

const getHistory = async (req, res) => {
    let userId = req.params.userId;
    let history = await historyService.getHistory(userId);
    return res.send({status: 1, result: {history}});
}


const deleteHistory = async (req, res) => {
    let userId = req.params.userId;
    let history = await historyService.deleteHistory(userId);
    return res.send({status: 1, ressult: {history}});
}


module.exports = {
    getHistory,
    deleteHistory
}