export function getColumnsByRole(role: string, columns: any[]) {}
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export function formatDate_YYYY_MM_DD(date) {
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
}

export function isDeepEqual(object1, object2) {
    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);

    if (objKeys1.length !== objKeys2.length) return false;

    for (var key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];

        const isObjects = isObject(value1) && isObject(value2);

        if ((isObjects && !isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
            return false;
        }
    }
    return true;
}
const isObject = (object) => {
    return object != null && typeof object === 'object';
};

export function formatCustomTime(date) {
    var d = new Date(date);
    /*     var day = d.getDate() + ' '; */

    var d = new Date(date);
    var day = d.toString().split(' ')[0];

    /*
    var minute = d.getMinutes();
    var hour = d.getHours() + ':';
    var month = d.getMonth() + '-';
    var year = d.getFullYear() + '-'; */

    return [/* year, month, */ day /* ,  hour, minute */].join('');
}
export function formatCustomDate(date) {
    var dateToFormat = date || new Date();

    var dd = dateToFormat.getDate();
    var mm = dateToFormat.getMonth() + 1;
    var yyyy = dateToFormat.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return dd + '-' + mm + '-' + yyyy;

    /*   console.log("date");
  console.log(date);

    var d = new Date(date);

    var year = d.getFullYear() + '';
    var month = d.getMonth() +1 + '-';
    var day = d.getDate() + '-';
    console.log([day, month, year].join(''));


    return [day, month, year].join(''); */
}

export function calculateDiff(date) {
    let currentDate = new Date();
    let dateSent = new Date(date);

    return Math.floor(
        (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
            Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) /
            (1000 * 60 * 60 * 24)
    );
}

export function isWeekendFunction(string) {
    var date = new Date(string);
    return date.getDay() === 6 || date.getDay() === 0;
}

export function getDateInYYYYMM(date) {
    var d = new Date(date);

    var day = '01-'; /* d.getDate()  +'-'*/
    var month = d.getMonth() + '-';
    var year = d.getFullYear() + '';

    return [day, month, year].join('');
}
