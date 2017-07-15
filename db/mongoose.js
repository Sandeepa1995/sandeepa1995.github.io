/**
 * Created by Damitha on 7/14/2017.
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/NoticesDB');

module.exports={mongoose};
