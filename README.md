# Javascript port of soroush/libcalendars

The original code (written in c language) can be found here https://github.com/soroush/libcalendars

Demo: https://hamedmasafi.github.io/libcalendars-js

## Installtion

```html
<!-- required -->
<script src="dist/cl-core.js"></script>

<!-- optional -->
<script src="dist/cl-gregorian.js"></script>
<script src="dist/cl-islamic-civil.js"></script>
<script src="dist/cl-jewish.js"></script>
<script src="dist/cl-julian.js"></script>
<script src="dist/cl-milankovic.js"></script>
<script src="dist/cl-solar-hijri.js"></script>
```
All of files except cl-core.js are optional.

## Usage

```js
var c = new Calendar(calendar_name);
```

There are 3 type of Calendar object's constructor:

```js
var c1 = new Calendar("jw", new Date());
var c2 = new Calendar("sh", 1398, 1, 7);
var c3 = new Calendar("ml", 321545);
```

The first one take a js Date object as second parametere in continue the Calendar will convert Date into it's selected calendar 
(e.g: Jewish). The second constructor take y,m,d and last constructor take a Julian day.

The calendar's names and codes are shown in the below table:

|Calendar name  | Code |
|---------------|----|
|Gregorian      | gr |
|Islamic civil  | is |
|Jewish         | jw |
|Julian         | ju |
|Milankovic     | ml |
|Solar hijri    | sh |

## Methods

### *toString()*
Returns a string in yyyy/m/d format

### *year()*
Rteurn current year

### *month()*
Returns month

### *day()*
Returns day

### *isLeap(year)*
Determine that _year_ is leap or not

### *isValid()*
Determine that current date is valid or not

### *monthsInYear(year)*
Returns months count in _year_

### *daysInMonth(year, month)*
Returns days count in _month_

### *daysInYear(year)*

Returns days count in _year_

### *convert(calendar_name)*
Convert current calendar to other calendar

Example:
```js
var jc = new Calendar('gr', 2018, 3, 10);
var shc = jc.convert('sh');
alert("Solar hijri date is: " + shc.toString());