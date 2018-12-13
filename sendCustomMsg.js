exports.main = function functionName(event, callback) {
  let responseURL = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='
  const data = event.data

  BaaS.wxAccessToken(event.signKey).then(res => {
    let {access_token} = res
    let params = {
      "touser": data.FromUserName,
    }
    switch (data.MsgType) {
      case 'text':
        params.msgtype = 'text'
        params.text = {
          "content": data.Content
        }
        break;
      case 'image':
        params.msgtype = 'image'
        params.image = {
          "media_id": data.MediaId
        }
        break;
      default:
        params.msgtype = 'text'
        params.text = {
          "content": '您可以发送文本消息和我们交流哦'
        }
    }

    BaaS.request.post(responseURL + access_token, params).then(res =>{
      callback(null, res)
    }).catch(err => {
      callback(err)
    })
  }).catch(err => {
    callback(err)
  })
}
