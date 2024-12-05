const mongoose = require('mongoose')

exports.convertToMongoObjectId = (idString) => {
    return mongoose.Types.ObjectId.createFromHexString(idString)
}
