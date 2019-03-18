// generated from cl-julian

function Cal_ju() {

}
if (__calendars_list == undefined)
        var __calendars_list = [];
__calendars_list.push('ju');

Cal_ju.prototype.is_leap = function(year){
    if(year < 0) {
        ++year;
    }
    return mod(year, 4) == 0 ? 1 : 0;
}
Cal_ju.prototype.days_in_month = function(month,year){
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
Cal_ju.prototype.days_in_year = function(year){
    return this.is_leap(year) ? 366 : 365;
}
Cal_ju.prototype.month_in_year = function(year){
    return 12;
}
Cal_ju.prototype.is_valid = function(year,month,day){
    if(day > 0 && day <= this.days_in_month(month, year)) {
        return 1;
    }
    return 0;
}
Cal_ju.prototype.to_jdn = function(year,month,day){
    var c0 = 0;
    var j1 = 0;
    var j2 = 0;
    if(!year) {
        return  0;
    }
    if(year < 0) {
        ++year;
    }
    c0 = fdiv(month - 3, 12);
    j1 = fdiv(1461 * (year + c0), 4);
    j2 = fdiv(153 * month - 1836 * c0 - 457, 5);
    return  j1 + j2 + day + 1721117;
}
Cal_ju.prototype.from_jdn = function(jd){
    var y2 = parseInt( jd - 1721118);
    var k2 = parseInt( 4 * y2 + 3);
    var k1 = parseInt( 5 * fdiv(mod(k2, 1461), 4) + 2);
    var x1 = parseInt( fdiv(k1, 153));
    var c0 = parseInt( fdiv(x1 + 2, 12));
    var __date = {}; 
    __date.year = (fdiv(k2, 1461) + c0);
    if(__date.year <= 0) {
        --(__date.year);
    }
    __date.month = (x1 - 12 * c0 + 3);
    __date.day =  fdiv(mod(k1, 153), 5) + 1;
    return __date;
}
Cal_ju.prototype.to_gr = function(j,g){
    var jdn = 0;
    jdn = this.to_jdn(j);
    jdn_to_gr(jdn, g);
}
Cal_gr.prototype.to_ju = function(g,j){
    var jdn = 0;
    jdn = gr_to_jdn(g);
    jdn_to_ju(jdn, j);
}
