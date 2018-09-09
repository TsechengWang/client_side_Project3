//定義需要用到的資料
var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"
// ;分英文跟密碼 |分字母

//後處理資料變成陣列應用
var morseList=morseCode.split("|")
for(var i=0;i<morseList.length;i++){
  morseList[i]=morseList[i].split(";")
  //附加到右邊清單上面
  $("ul.translist").append("<li>"+morseList[i][0]+" "+morseList[i][1]+"</li>")
}

//找到文字對應到的密碼
// 文章翻譯->字的翻譯
function findCode(letter){
  //全部找過一輪傳回對應密碼
  for(var i=0;i<morseList.length;i++){
    if(morseList[i][0]==letter){
      return morseList[i][1]
    }
  }
  return letter
  // 有比對到就回傳密碼，沒有就回傳原字(不用再寫else)
}

//找到密碼對應到的文字
function findLetter(code){
  //全部找過一輪傳回對應文字
  for(var i=0;i<morseList.length;i++){
    if (morseList[i][1]==code){
      return morseList[i][0]
    }
  }
  return code
  //如果沒找到就回傳原始的密碼
}

//翻譯整篇文字變成code
function tanslateToMorse(text){
  text=text.toUpperCase()
  // 讓他輸入大小寫都變大寫
  var result=""
  for(var i=0;i<text.length;i++){
    result+=findCode(text[i])+" "
  }
  return result
}

//翻譯整篇code變成文字
function tanslateToEng(text){
  text=text.split(" ")
  // 讓他用空白分開，用陣列找結果
  var result=""
  for(var i=0;i<text.length;i++){
    result+=findLetter(text[i])+" "
  }
  return result
}

// 測試function
// var otext="hello/world"
// var ttext=tanslateToMorse(otext)
// var btext=tanslateToEng(ttext)

// 把翻譯對應到使用者輸入到文字框
//轉換成密碼
$("#btnMorse").click(function(){
  var input = $("#input").val()
  // val():負責取使用者輸入的參數->取
  // val(附參數):將框框變成參數->寫
  var result=tanslateToMorse(input)
  $("#output").val(result)
  //動畫
  $("#output").css({
    backgroundColor: "#292B73"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".symbol").velocity({
    rotateZ: ["0deg","360deg"]
  })
})

//轉換成英文
$("#btnEng").click(function(){
  var input = $("#output").val()
  // val():負責取使用者輸入的參數->取
  // val(附參數):將框框變成參數->寫
  var result=tanslateToEng(input)
  $("#input").val(result)
  //動畫
  $("#input").css({
    backgroundColor: "#FFB637"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".symbol").velocity({
    rotateZ: ["0deg","360deg"]
  })
})

// 使用者輸入小寫自動變大寫&空格自動被拿掉
$("#input").keyup(function(){
  var original=$("#input").val()
  var newtext=original.toUpperCase().split(" ").join("")
  // 用沒有東西接起來
  $("#input").val(newtext)
})


// 播放
function play(texts,nowindex){
  var word=texts[nowindex]
  // console.log(word)
  var lasttime=300
  if(word=="."){
    $("audio.short")[0].play()
    lasttime=300
  }else if(word=="-"){
    $("audio.long")[0].play()
    lasttime=500
  }else{
    lasttime=1000
  }
  console.log(word+lasttime)
  //顯示當下播放的字母
  $(".playlist span").removeClass("playing")
  $(".playlist span")
    .eq(nowindex).addClass("playing")
  // eq:抓第幾個
  //如果當下位置<文字長度 繼續呼叫自己
  if(texts.length>nowindex){
    setTimeout(function(){
      play(texts,nowindex+1)
    },lasttime)
  }else{
    $(".playlist").html("")
    // 播放完清空
  }
}

//設定音量
$("audio.short")[0].volume=0.3
$("audio.long")[0].volume=0.3

//播放聲音
$("#btnPlay").click(function(){
  var texts=$("#output").val()
  $(".playlist").html("")
  for(var i=0;i<texts.length;i++){
    $(".playlist").append("<span>"+texts[i]+"</span>")
  }
  play(texts,0)
})