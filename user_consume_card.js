exports.main = function functionName(event, callback) {
  /**
   * 云函数操作数据表文档：https://doc.minapp.com/cloud-function/node-sdk/schema/
  */
  let tableName = 'consume_card' // 将 tableName 替换成对应的表名称
  let userConsumeCard = new BaaS.TableObject(tableName)
  let newConsume = userConsumeCard.create()
  
  let data = {
    cardId: event.data.CardId,
    cardCode: event.data.UserCardCode,
    locationName: event.data.LocationName,
    transId: event.data.TransId,
  }
  
  newConsume.set(data).save().then(res => {
    console.log(res)
  }, err => {
    // error
  });
}
