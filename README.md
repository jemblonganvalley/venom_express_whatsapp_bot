## Whatsappbot using Venom
1. Clone this repository
2. Run ```npm install```
3. Rename **.env.sample** to **.env**
4. Insert PORT, API_KEY, API_USERNAME and API_PASSWORD in .env file
5. run ```npm run dev``` please wait until qr code show in your terminal screen
6. Open whatsapp in your mobile phone and scan it
7. Wait until **instance connected** text show, this will take some minute, just wait!!
8. open in browser http://localhost:<YOUR PORT>
9. Insert Phone number eg: **628xxxxxx** , please use intenational code number without + sign
10. Write message and send..

## Using Test Rest file
You can test send message by using test.rest file.
1. Open this project in Vscode
2. Install VsCode extension **REST Client** by *Huachao Mao*
3. Run server in your terminal ```npm run dev```
4. Open file *test.rest*
5. Hit api */api/request_token* by click *send request* text in test.rest file, this process will open new window with response body.
6. Copy token from response and past into Authorization, and Hit send request text.

## update version 2
1. Update multer LTS Version