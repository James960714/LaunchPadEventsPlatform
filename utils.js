const mongoose = require('mongoose')

exports.convertToMongoObjectId = (idString) => {
    return mongoose.Types.ObjectId.createFromHexString(idString)
    .then((response)=> {
        console.log(response)
        return response
    })
    .catch((err) => {
        console.log(err)
        return err
    })
}
