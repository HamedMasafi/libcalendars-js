function __is_calendar_registered(cal) {
    for (var i = 0; i < __calendars_list.length; i++)
        if (__calendars_list[i].nm === cal)
            return true;
    return false;
}

function __create_calendar_object(name) {
    if (!__is_calendar_registered(name))
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