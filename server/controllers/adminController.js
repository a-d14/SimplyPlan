const {User} = require('../models/userModel');

exports.log = async (req, res) => {
  const statusCount = await User.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const newUserCount = await User.aggregate([
    {
      $match: {
        joinDate: { $gte: thirtyDaysAgo, $lte: new Date() }
      }
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 }
      }
    }
  ]);

  const loginCount = await User.aggregate([
    {
      $match: {
        lastLogin: { $gte: thirtyDaysAgo, $lte: new Date() }
      }
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 }
      }
    }
  ]);

  const totalUsers = await User.countDocuments({});
  const lostUsers = await User.countDocuments({status: 'DEACTIVATED'});
  
  return res.status(200).json({
    status: 'success',
    data: {userStatus: statusCount, "activity (last 30 days)": {newUsersJoined: newUserCount, uniqueLogins: loginCount}, "customer churn rate (30 days)": ((lostUsers/totalUsers) * 100).toFixed(2) + "%"}
  }); 
};