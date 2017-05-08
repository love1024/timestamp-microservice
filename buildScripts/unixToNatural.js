import calender from './calender'

exports.unixToNatural = function getNormalDate(date) {
    let d = new Date(date*1000);
    return calender.getMonthName(d.getMonth()+1)+" "+d.getDate()+", "+d.getFullYear();
}
