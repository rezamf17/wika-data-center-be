const moment = require('moment')

const ISOString = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {ISOString}