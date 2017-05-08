const months = {1:"January",2:"Febuary",3:"March",
                4:"April",5:"May",6:"June",7:"July",
                8:"August",9:"Septemper",10:"October",11:"November",
                12:"December"};

const days = [31,28,31,30,31,30,31,30,31,30,31,30];

exports.getLeapYearsBetween = function (start,end) {
    let leap = 0;
    for(var i=start;i<=end;i++) {
        if(this.isLeap(i))
            leap++;
    }
    return leap;
}

exports.isLeap = function (year) {
    if(year%100 == 0) {
        return year%400 == 0;
    } else {
        return year%4 == 0;
    }
}

exports.getMonthNumber = function (month) {
    for(let m in months){
        if(months[m] == month)
            return m;
    }
    return null;
}

exports.getDaysTillMonth = function(month) {
    let totalDays = 0;
    for(var i=0;i<month-1;i++)
        totalDays += days[i];
    return totalDays;
}

exports.getMonthTillDays = function(day) {
    let month = 0;
    for(let i=0;i<12;i++) {
        if(day - days[i] <= 0)
            break;
        day = day - days[i];
        month++;
    }
    return month;
}

exports.getMonthName = function(month) {
    return months[month];
}

