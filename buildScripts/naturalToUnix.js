import calender from './calender';

exports.naturalToUnix = function(date) {
    let unixTime = 0;
    //splitting date
    date = date.split('%20');

    //Getting day,month and year
    let year = parseInt(date[2]);
    let month = calender.getMonthNumber(date[0]);
    let day = date[1].substring(0,date[1].length-1);
    let leap = calender.getLeapYearsBetween(1970,year-1);

    //if not a valid date return
    if(month == null)
        return null;

    //Calculating total days by year
    unixTime += (year-1970)*365 + leap;

    //Calculating total days by month of current year
    unixTime = unixTime + calender.getDaysTillMonth(month);

    //if current year is leap increasing day
    if(calender.isLeap(year) && month > 2)
        unixTime++;

    //adding days
    unixTime += (parseInt(day)-1);
    return unixTime*60*60*24;
}
