// generated from cl-gregorian

function Cal_gr() {

}
if (__calendars_list == undefined)
        var __calendars_list = [];
__calendars_list.push('gr');

Cal_gr.prototype.is_leap = function(year){
    if((year & 3) == 0 && ((year % 25) != 0 || (year & 15) == 0)) {
        return 1;
    } else {
        return 0;
    }
}
Cal_gr.prototype.days_in_month = function(month,year){
    switch(month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;
        case 02:
            return this.is_leap(year) ? 29 : 28;
            break;
        default:
            return 0;
            break;
    }
}
Cal_gr.prototype.days_in_year = function(year){
    return this.is_leap(year) ? 366 : 365;
}
Cal_gr.prototype.month_in_year = function(year){
    return 12;
}
Cal_gr.prototype.is_valid = function(year,month,day){
    if(month <= this.month_in_year(year) && day <= this.days_in_month(month, year)) {
        return 1;
    }
    return 0;
}
Cal_gr.prototype.to_jdn = function(year,month,day){
    var c0 = parseInt( fdiv((month - 3) , 12));
    var x1 = parseInt( month - (12 * c0) - 3);
    var x4 = parseInt( year + c0);
    var d = pdiv(x4, 100);
    return  fdiv(146097 * d.quot,  4)
          + fdiv(36525 * d.rem, 100)
          + fdiv(153 * x1 + 2 , 5)
          + day + 1721119;
}
Cal_gr.prototype.from_jdn = function(jd){
    var __date = {};

    var x3 = pdiv(4 * jd - 6884477, 146097);
    var x2 = pdiv(100 * (x3.rem / 4) + 99, 36525);
    var x1 = pdiv(5 * (x2.rem / 100) + 2, 153);
    var c0 = parseInt( (x1.quot + 2) / 12);
    __date.day = (x1.rem / 5) + 1;
    __date.month = x1.quot - 12 * c0 + 3;
    __date.year = 100 * x3.quot + x2.quot + c0;
    return __date;
}
