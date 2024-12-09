
function getCurrentDate(data) {
    let date = data != undefined ? new Date(data) : new Date()
    let day = '' + date.getDate()-1
    let year = date.getFullYear()
    if (day.length < 2) day = '0' + day;
    console.log(day, year)
    return [day, date.toLocaleString('en-US', { month: 'short' }), year].join('-')
}

console.log(getCurrentDate())