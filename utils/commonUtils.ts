export class CommonUtils {

    async getCurrentDate(data) {
        let date = data != undefined ? new Date(data) : new Date()
        let day = '' + date.getDate()
        let year = date.getFullYear()
        if (day.length < 2) day = '0' + day;
        return [day, date.toLocaleString('en-US', { month: 'short' }), year].join('-')
    }


}