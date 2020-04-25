
var client = window.client;
XHRMock.get(
    "../../../https@ball.xiaohuaiyule.com/weapp/get_login_reward",
    function(req, resp) {
        resp = resp.body('{"msg":"success","code":0,"data":2}');
        return Promise.resolve(resp);
    }
);

// 请求元数据
// {
//     "startedDateTime": "2019-01-17T14:44:07.742+08:00",
//     "time": 27,
//     "request": {
//         "method": "GET",
//         "url": "../../../https@ball.xiaohuaiyule.com/weapp/get_login_reward",
//         "httpVersion": "HTTP/1.1",
//         "cookies": [],
//         "headers": [
//             {
//                 "name": "Host",
//                 "value": "ball.xiaohuaiyule.com"
//             },
//             {
//                 "name": "Content-Type",
//                 "value": "application/json"
//             },
//             {
//                 "name": "X-WX-Skey",
//                 "value": "a8d812aef6f29d34ea74c2d36d1ebbd04eae985b"
//             },
//             {
//                 "name": "Accept",
//                 "value": "*/*"
//             },
//             {
//                 "name": "Connection",
//                 "value": "keep-alive"
//             },
//             {
//                 "name": "X-WX-Region",
//                 "value": "0"
//             },
//             {
//                 "name": "User-Agent",
//                 "value": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 MicroMessenger/7.0.2(0x17000222) NetType/WIFI Language/zh_CN"
//             },
//             {
//                 "name": "Referer",
//                 "value": "../../../https@servicewechat.com/wx00bc7b4a1daec5fd/8/page-frame.html"
//             },
//             {
//                 "name": "Accept-Language",
//                 "value": "zh-cn"
//             },
//             {
//                 "name": "Accept-Encoding",
//                 "value": "br, gzip, deflate"
//             }
//         ],
//         "queryString": [],
//         "headersSize": 526,
//         "bodySize": 0
//     },
//     "response": {
//         "_charlesStatus": "COMPLETE",
//         "status": 200,
//         "statusText": "OK",
//         "httpVersion": "HTTP/1.1",
//         "cookies": [],
//         "headers": [
//             {
//                 "name": "Server",
//                 "value": "nginx/1.10.3 (Ubuntu)"
//             },
//             {
//                 "name": "Date",
//                 "value": "Thu, 17 Jan 2019 06:44:07 GMT"
//             },
//             {
//                 "name": "Content-Type",
//                 "value": "text/html;charset=UTF-8"
//             },
//             {
//                 "name": "Transfer-Encoding",
//                 "value": "chunked"
//             },
//             {
//                 "name": "Content-Encoding",
//                 "value": "gzip"
//             },
//             {
//                 "name": "Connection",
//                 "value": "keep-alive"
//             }
//         ],
//         "content": {
//             "size": 35,
//             "mimeType": "text/html;charset=UTF-8",
//             "text": "{\"msg\":\"success\",\"code\":0,\"data\":2}"
//         },
//         "redirectURL": null,
//         "headersSize": 0,
//         "bodySize": 64
//     },
//     "serverIPAddress": "62.234.102.32",
//     "cache": {},
//     "timings": {
//         "dns": -1,
//         "connect": -1,
//         "ssl": -1,
//         "send": 0,
//         "wait": 26,
//         "receive": 1
//     }
// }
