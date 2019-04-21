const getOptions = params =>{
    let paramString = params
    let requestObject = paramString.split('&')
    let parsedArray = requestObject.map(el=>el.split('='))
    let queryRequest = {}
    queryRequest.tableName = parsedArray[0][1];
    queryRequest.firstname = parsedArray[1][1]
    return queryRequest
}

module.exports = getOptions