
export function dealDate(str){
    let perStr = String(str).replace(/ GMT.+$/, '');// Or str = str.substring(0, 24)
    let d = new Date(perStr);
    let a = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()];
    for(let i = 0, len = a.length; i < len; i ++) {
        if(a[i] < 10) {
            a[i] = '0' + a[i];
        }
    }

    let newDate = a[0] + '-' + a[1] + '-' + a[2] + ' ' + a[3] + ':' + a[4];

    return newDate
}


export function getSecondByDate(begin,end) {
    var beginDate  = new Date(begin);
    var endDate = new Date(end);
    var diff = endDate.getTime() - beginDate.getTime();
    var sec = diff /1000;
    return  sec/60/60 ;
}

