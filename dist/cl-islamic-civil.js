// generated from cl-islamic-civil

function Cal_is() {

}
if (__calendars_list == undefined)
        var __calendars_list = [];
__calendars_list.push({nm: 'is', name: 'islamic civil'});

Cal_is.prototype.is_leap = function(year){
    if(year < 0) {
        ++year;
    }
    if(mod(year * 11 + 14, 30) < 11) {
        return 1;
    }
    return 0;
}
Cal_is.prototype.days_in_month = function(month,year){
    if(year == 0) {
        return 0;
    }
    if(month == 12 && this.is_leap(year)) {
        return 30;
    }
    return month % 2 == 0 ? 29 : 30;
}
Cal_is.prototype.days_in_year = function(year){
    return this.is_leap(year) ? 355 : 354;
}
Cal_is.prototype.month_in_year = function(year){
    if(year == 0) {
        return 0;
    }
    return 12;
}
Cal_is.prototype.is_valid = function(year,month,day){
    if(year != 0 &&  month <= this.month_in_year(year) && day <= this.days_in_month(month, year)) {
        return 1;
    }
    return 0;
}
Cal_is.prototype.to_jdn = function(year,month,day){
    if(year <= 0) {
        ++year;
    }
    return  fdiv(10631 * year - 10617, 30)
          + fdiv(325 * month - 320, 11)
          + day + 1948439;
}
Cal_is.prototype.from_jdn = function(jd){
    var __date = {};

    var k2 = parseInt( 30 * (jd - 1948440) + 15);
    var k1 = parseInt( 11 * fdiv(mod(k2, 10631), 30) + 5);
    var effective_year = parseInt( fdiv(k2, 10631) + 1);
    if(effective_year <= 0) {
        --effective_year;
    }
    __date.year = effective_year;
    __date.month = fdiv(k1, 325) + 1;
    __date.day = fdiv(mod(k1, 325), 11) + 1;
    return __date;
}
Cal_is.prototype.to_gr = function(j,g){
    var jdn = 0;
    jdn = this.to_jdn(j);
    jdn_to_gr(jdn, g);
}
Cal_gr.prototype.to_is = function(g,j){
    var jdn = 0;
    jdn = gr_to_jdn(g);
    jdn_to_is(jdn, j);
}
