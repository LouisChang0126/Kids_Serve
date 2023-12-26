// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD0tANjRBSfLAZN01SEd12h7ak_kBxnppQ",
    authDomain: "test-6d304.firebaseapp.com",
    projectId: "test-6d304",
    storageBucket: "test-6d304.appspot.com",
    messagingSenderId: "992913315192",
    appId: "1:992913315192:web:c651e15336909777a5248d"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// 解析 URL 中的參數
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

// 在DOM加载完毕后执行
document.addEventListener("DOMContentLoaded", function() {
    db.collection("kids_serve").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                // 获取文档数据
                const data = doc.data();
                //hightlight
                const preacher = (data.信息 === user) ? 'class="is-warning"' : '';
                const leader = (data.主領 === user) ? 'class="is-warning"' : '';
                const vice = (data.副主領 === user) ? 'class="is-warning"' : '';
                const little = (data.小寶 === user) ? 'class="is-warning"' : '';
                const midium = (data.中寶 === user) ? 'class="is-warning"' : '';
                const big = (data.大寶 === user) ? 'class="is-warning"' : '';
                const prayer = (data.守望 === user) ? 'class="is-warning"' : '';
                const anchor = (data.司會 === user) ? 'class="is-warning"' : '';
                const backstage = (data.後台 === user) ? 'class="is-warning"' : '';
                const range = (data.範圍 === user) ? 'class="is-warning"' : '';
                const welcomer = (data.招待.includes(user)) ? 'class="is-warning"' : '';
                const saturday = (data.週六敬拜 === user) ? 'class="is-warning"' : '';
                //複雜的兒童服事
                const kids_serve = data.兒童服事.map(item => `<div>${item}</div>`).join('\n');
                if(data.兒童服事.length === 0){
                    kids_serve='';
                    console.log('陣列是空的');
                }
                //重要資訊 換行
                var info;
                if (Array.isArray(data.重要資訊)) {
                    info = data.重要資訊.map(item => `<div>${item}</div>`).join("\n");
                } else {
                    info = ''; // 或者设置一个默认值，具体取决于你的需求
                    console.log('重要資訊不是一个数组');
                }
                //內文
                document.getElementById('chart').innerHTML += `
                <tr>
                    <th>${doc.id.substring(5,10).replace('.', '/')}</th>
                    <th>${info}</th>
                    <th ${preacher}>${data.信息}</th>
                    <th ${leader}>${data.主領}</th>
                    <th ${vice}>${data.副主領}</th>
                    <th ${little}>${data.小寶}</th>
                    <th ${midium}>${data.中寶}</th>
                    <th ${big}>${data.大寶}</th>
                    <th ${prayer}>${data.守望}</th>
                    <th ${anchor}>${data.司會}</th>
                    <th ${backstage}>${data.後台}</th>
                    <th ${range}>${data.範圍}</th>
                    <th>${kids_serve}</th>
                    <th ${welcomer}>${data.招待}</th>
                    <th ${saturday}>${data.週六敬拜}</th>
                </tr>
                `;
            }
        });
    });
});