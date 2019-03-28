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

```js
var c1 = new Calendar("jw", new Date());
var c2 = new Calendar("sh", 1398, 1, 7);
var c3 = new Calendar("ml", 321545);
```

|Calendar name  |    |
|---------------|----|
|Islamic civil  | is |
|Jewish         | jw |
|Julian         | ju |
|Milankovic     | ml |
|Solar hijri    | sh |