
var client = window.client;
XHRMock.post(
    "../../../https@ball.xiaohuaiyule.com/weapp/sync_client_data",
    function(req, resp) {
        resp = resp.status(200);resp = resp.header('Server', 'nginx/1.10.3 (Ubuntu)').header('Date', 'Thu, 17 Jan 2019 06:43:59 GMT').header('Content-Type', 'text/html;charset=UTF-8').header('Transfer-Encoding', 'chunked').header('Content-Encoding', 'gzip').header('Connection', 'keep-alive');
        resp = resp.body('{"msg":"success","code":0,"data":"eyJnb2xkIjo1MDAsInNjb3JlIjowLCJkYWlseURhdGEiOlt7ImNvdW50IjoxLCJpZCI6MX0seyJjb3VudCI6MSwiaWQiOjJ9LHsiY291bnQiOjEsImlkIjozfV0sImNoaXBEYXRhIjpbXSwiY3VyU2tpbklkIjoxLCJoYXZlTWFpbCI6MSwic2tpbkRhdGEiOlt7ImZpbmlzaENvdW50IjoxLCJnYWluVGltZSI6MCwic2tpbklkIjozfSx7ImZpbmlzaENvdW50IjoxLCJnYWluVGltZSI6MCwic2tpbklkIjoyM30seyJmaW5pc2hDb3VudCI6MSwiZ2FpblRpbWUiOjAsInNraW5JZCI6MjR9XSwic2VydmVyVGltZSI6MTU0NzcwNzQzOTMzNywicmVzZXRUaW1lIjoxNTQ1NjY3MjAwMDAwLCJjbGllbnRSZXNldFRpbWUiOjB9"}');
        return Promise.resolve(resp);
    }
);

// 请求元数据
// {
//     "startedDateTime": "2019-01-17T14:43:59.329+08:00",
//     "time": 59,
//     "request": {
//         "method": "POST",
//         "url": "../../../https@ball.xiaohuaiyule.com/weapp/sync_client_data",
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
//                 "name": "Accept-Encoding",
//                 "value": "br, gzip, deflate"
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
//                 "name": "Content-Length",
//                 "value": "380"
//             },
//             {
//                 "name": "Accept-Language",
//                 "value": "zh-cn"
//             }
//         ],
//         "queryString": [],
//         "postData": {
//             "mimeType": "application/json",
//             "text": "eyJjdXJTa2luSWQiOjEsImdvbGQiOjUwMCwiY2xpZW50UmVzZXRUaW1lIjowLCJzY29yZSI6MjUsInNraW5EYXRhIjpbeyJmaW5pc2hDb3VudCI6MSwiZ2FpblRpbWUiOjAsInNraW5JZCI6M30seyJmaW5pc2hDb3VudCI6MSwiZ2FpblRpbWUiOjAsInNraW5JZCI6MjN9LHsiZmluaXNoQ291bnQiOjEsImdhaW5UaW1lIjowLCJza2luSWQiOjI0fV0sImNoaXBEYXRhIjpbXSwiZGFpbHlEYXRhIjpbeyJjb3VudCI6MSwiaWQiOjF9LHsiY291bnQiOjEsImlkIjoyfSx7ImNvdW50IjoxLCJpZCI6M31dfQ=="
//         },
//         "headersSize": 548,
//         "bodySize": 380
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
//                 "value": "Thu, 17 Jan 2019 06:43:59 GMT"
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
//             "size": 500,
//             "compression": 153,
//             "mimeType": "text/html;charset=UTF-8",
//             "text": "{\"msg\":\"success\",\"code\":0,\"data\":\"eyJnb2xkIjo1MDAsInNjb3JlIjowLCJkYWlseURhdGEiOlt7ImNvdW50IjoxLCJpZCI6MX0seyJjb3VudCI6MSwiaWQiOjJ9LHsiY291bnQiOjEsImlkIjozfV0sImNoaXBEYXRhIjpbXSwiY3VyU2tpbklkIjoxLCJoYXZlTWFpbCI6MSwic2tpbkRhdGEiOlt7ImZpbmlzaENvdW50IjoxLCJnYWluVGltZSI6MCwic2tpbklkIjozfSx7ImZpbmlzaENvdW50IjoxLCJnYWluVGltZSI6MCwic2tpbklkIjoyM30seyJmaW5pc2hDb3VudCI6MSwiZ2FpblRpbWUiOjAsInNraW5JZCI6MjR9XSwic2VydmVyVGltZSI6MTU0NzcwNzQzOTMzNywicmVzZXRUaW1lIjoxNTQ1NjY3MjAwMDAwLCJjbGllbnRSZXNldFRpbWUiOjB9\"}"
//         },
//         "redirectURL": null,
//         "headersSize": 0,
//         "bodySize": 347
//     },
//     "serverIPAddress": "62.234.102.32",
//     "cache": {},
//     "timings": {
//         "dns": -1,
//         "connect": -1,
//         "ssl": -1,
//         "send": 1,
//         "wait": 57,
//         "receive": 1
//     }
// }
