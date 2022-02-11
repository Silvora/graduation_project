const db = require('./db.js')
async function setActiveList(){
    let sql = `SELECT * FROM ActivityManager`
    const paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            //console.log(result)
            result.forEach(item => {
                if(item.activity_apply_coding != 2){
                    dateStr(item.begin_time, item.end_time, item.UID)
                }
                //console.log(item.begin_time, item.end_time)
            });
        }
    })
}


function dateStr(startDate, endDate ,UID){

    //现在时间戳
    let newDate = new Date().getTime()
    //console.log(newDate)

    //活动开始时间戳
    let start = new Date(startDate);

    //活动结束时间戳
    let end = new Date(endDate);

    //let timeEnd = time*60*60*1000 + end.getTime()
    //console.log(timeEnd)

    if(newDate >= start && newDate <= end){
        //console.log('活动进行中')
        setActiveCoding(1, UID)
    }

    // if(newDate <= start){
    //     console.log('活动未开始')
    // }

    if(newDate >= end){
        console.log('活动截止')
        setActiveCoding(2, UID)
    }

}


async function setActiveCoding(Status, UID){
    let sql = `UPDATE ActivityManager SET activity_apply_coding='${Status}' where UID='${UID}'`
    const paramse = [];
    await db(sql, paramse, (result)=>{
        if(result){
            //console.log(result)
            console.log('数据更新成功')
        }
    })
}


module.exports = {
    setActiveList
}

