/**
 * Funcction that parsed string to object
 * @param {string} params - comes from req.params.options
 * @returns {object} 
 */

const getOptions = params => {
    let requestArr = params.split('&')
    let parsedArray = requestArr.map(el => el.split('='))
    console.log(parsedArray)
    let paramsRequest= {};
    parsedArray.map((el,i)=>{
        let key = el[0];
        let value = el[1];
        paramsRequest[i] = `${key} = '${value}'`
    })
    return paramsRequest
}

module.exports = getOptions