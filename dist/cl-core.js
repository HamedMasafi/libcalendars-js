function div (a, b) {
    return {
        quot: Math.floor(a / b),
        rem: a % b
    }
}
function q (x){
    return parseInt(fdiv(fdiv(235 * x + 1, 19), 1095));
}
function r (x){
    return parseInt(mod(fdiv(235 * x + 1, 19), 1095));
}
function v1 (x){
    var c1 = parseInt( fdiv(235 * x + 1, 19));
    var qx = parseInt( fdiv(c1, 1095));
    return parseInt(32336 * qx
           + fdiv(15 * qx + 765433 * mod(c1, 1095) + 12084, 25920));
}
function v2 (x){
    var c1 = parseInt( fdiv(235 * x + 1, 19));
    var qx = parseInt( fdiv(c1, 1095));
    var v1x = parseInt( 32336 * qx
                        + fdiv(15 * qx + 765433 * mod(c1, 1095) + 12084, 25920));
    return parseInt(v1x + mod(fdiv(6 * mod(v1x, 7), 7), 2));
}
function L2 (x){
    return parseInt(v2(x + 1) - v2(x));
}
function v3 (x){
    return parseInt(2 * mod(fdiv(L2(x) + 19, 15), 2));
}
function v4 (x){
    return parseInt(mod(fdiv(L2(x - 1) + 7, 15), 2));
}
function c2 (x){
    return parseInt(v2(x) + v3(x) + v4(x));
}
function L (x){
    return parseInt(c2(x + 1) - c2(x));
}
function c3 (x){
    return parseInt(fdiv(384 * x + 7, 13)
           + mod(fdiv(L(x) + 7, 2), 15) * fdiv(x + 4, 12)
           - mod(fdiv(385 - L(x), 2), 15) * fdiv(x + 3, 12));
}
function c4 (x,y){

    var c1 = parseInt( fdiv(235 * x + 1, 19));
    var qx = parseInt( fdiv(c1, 1095));
    var Ly = parseInt( L(y));
    var rx = parseInt( mod(c1, 1095));
    var v1x = parseInt( 32336 * qx
                        + fdiv(15 * qx + 765433 * rx + 12084, 25920));
    return parseInt(v1x
        + mod(fdiv(6 * mod(v1x, 7), 7), 2)
        + 2 * mod(fdiv(L2(x) + 19, 15), 2)
        + mod(fdiv(L2(x - 1) + 7, 15), 2)
        + fdiv(384 * y + 7, 13)
        + mod(fdiv(Ly + 7, 2), 15) * fdiv(y + 4, 12)
        - mod(fdiv(385 - Ly, 2), 15) * fdiv(y + 3, 12));
}
function cycle (jdn){
    var offset = parseInt( jdn - hijri_shamsi_epoch);
    var cycle_no = parseInt( offset / cycle_days);
    if(offset < 0) {
        --cycle_no;
    }
    return parseInt(cycle_no);
}
function cycle_start (jdn){
    var era = parseInt( cycle(jdn));
    var start = parseInt( hijri_shamsi_epoch + era * cycle_days);
    return parseInt(start);
}
function fdoy_c (year,cycleNo){
    var d_c = parseFloat( (year * year_length)); 
    
    var fdoy_c = parseInt( (Math.floor(d_c)));
    return parseInt(hijri_shamsi_epoch + cycleNo * cycle_days + fdoy_c );
}
function fdoy (year){
    
    var c = parseInt( year / cycle_years);
    
    var fdoy_c ;
    
    var d_c ;
    year -= 475;
    if(year < 0) {
        c--;
    }
    year -= (c * cycle_years);
    d_c = (year * year_length);
    fdoy_c = (Math.floor(d_c));
    return parseInt(hijri_shamsi_epoch + c * cycle_days + fdoy_c );
}
function pdiv (y,x){
    var rv = div(y, x);
    if(rv.rem < 0) {
        if(x>0) {
            rv.quot -= 1;
            rv.rem += x;
        } else {
            rv.quot += 1;
            rv.rem -= x;
        }
    }
    return rv;
}
function fdiv (a,b){
    return parseInt((a - (a < 0 ? b - 1 : 0)) / b);
}
function mod (x,y){
    return parseInt(x - fdiv(x, y) * y);
}
function __create_calendar_object(name) {
    if (__calendars_list.indexOf(name) === -1) 
        return false;
    var cc;
    eval("cc = new Cal_" + name + "()");
    return cc;
}
function Calendar(cal) {
    this.cal = __create_calendar_object(cal);
    this.jdn = false;

    if (this.cal === false) {
        console.log("The calendar " + cal + " is not exists");
        return;
    }
    if (arguments.length == 2) { 
        if (typeof arguments[1] === "number") {
            this.jdn = parseFloat(arguments[1]);
            this.d = this.cal.from_jdn(this.jdn)
        } else if (typeof arguments[1].getFullYear === "function") {
            var d = {
                year: arguments[1].getFullYear(),
                month: arguments[1].getMonth() + 1,
                day: arguments[1].getDate()
            }
            this.jdn = new Calendar('gr', d.year, d.month, d.day).julianDay();
            this.d = this.cal.from_jdn(this.jdn)
        } else {
            this.d = arguments[1];
            this.jdn = parseInt(this.cal.to_jdn(this.d.year, this.d.month, this.d.day));
        }

    } else if (arguments.length == 4) {
        this.d = {
            year: parseInt(arguments[1]),
            month: parseInt(arguments[2]),
            day: parseInt(arguments[3])
        }
        this.jdn = parseInt(this.cal.to_jdn(this.d.year, this.d.month, this.d.day));
    } else
        this.d = {
            year: 0,
            month: 0,
            day: 0
        }

    this.d = {
        year: parseInt(this.d.year),
        month: parseInt(this.d.month),
        day: parseInt(this.d.day)
    }
    if (isNaN(this.d.year) || isNaN(this.d.month) || isNaN(this.d.day))
        console.log("invalid date of calendar " + cal)

    if (this.jdn === false)
        console.log("error in jdn of calendar " + cal)
}

Calendar.prototype.toString = function() {
    return this.d.year + "/" + this.d.month + "/" + this.d.day
}

Calendar.prototype.toDate = function() {

}

Calendar.prototype.isLeap = function (){
    return this.cal.is_leap(this.d.year) === 1
}

Calendar.prototype.convert = function(ocal) {
    // var jdn = this.cal.to_jdn(this.d.year, this.d.month, this.d.day);
    return new Calendar(ocal, this.jdn)
}

Calendar.prototype.isValid = function(ocal) {
    return this.cal.is_valid(this.d.year, this.d.month, this.d.day) === 1
}

Calendar.prototype.julianDay = function() {
    if (arguments.length === 1)
        this.jdn = parseInt(arguments[0]);
    else
        return parseInt(this.cal.to_jdn(this.d.year, this.d.month, this.d.day));
}

Calendar.prototype.monthsInYear = function(y) {
    return this.cal.month_in_year(y);
}

Calendar.prototype.daysInMonth = function(y, m) {
    return this.cal.days_in_month(m, y);
}

Calendar.prototype.daysInYear = function(y) {
    return this.cal.days_in_year(y);
}

var __date_toString = Date.prototype.toString

Date.prototype.toString = function() {
    if (arguments.length == 0)
        return __date_toString();
    else if (arguments.length == 1)
        return __date_toString(arguments[0]);

    return arguments[0];
}