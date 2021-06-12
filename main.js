"use strict";

let keisan;
let first = document.getElementById("q1");
let second = document.getElementById("q2");
let my_audio = new Audio("パズルゲーム.mp3");
let ansVoice = new Audio("a_voice4.mp3");
let missVoice = new Audio("m_voice4.mp3");
let fiveVoice = new Audio("f_voice4.mp3");

let end;
let after;
let counter;
let nowTIme;
let timer;
let clear = function () {
  clearInterval(timer);
};
let i = 10;
timer = function () {
  if (i < 0) {
    clear();
  } else {
    console.log(i + "秒経過");
    document.getElementById("timeCount").innerText = i;
    i--;
    }
  };

// 「はじめよう」ボタンクリックでイベント実行
document.getElementById("start").onclick = function game() {
  let ketasu = 9;
  let ope = "+";
  let test1;
  let test2;

  my_audio.play();
  my_audio.volume = 0.5;

  timer();
  setInterval(timer, 1000);

  // 正誤判定の画像とテキストをリセット
  document.getElementById("image").setAttribute("src", "");
  document.getElementById("message").innerText = "";
  document.getElementById("kaisu").innerText = "";
  document.getElementById("shousan").innerText = "";

  // selectタグのoption要素で指定された項目を取得
  let level = document.getElementById("select").value;
  // プルダウン選択した項目で数値桁数・演算子・計算式を指定
  if (level == "level4") {
    ope = "-";
  } else if (level == "level7") {
    ope = "×";
  } else if (level == "level10") {
    ope = "÷";
  } else if (level == "level2") {
    // 桁数を変更
    ketasu = 99;
  } else if (level == "level5") {
    // 桁数を変更
    ketasu = 99;
    ope = "-";
  } else if (level == "level8") {
    // 桁数を変更
    ketasu = 99;
    ope = "×";
  } else if (level == "level11") {
    // 桁数を変更
    ketasu = 99;
    ope = "÷";
  } else if (level == "level3") {
    // 桁数を変更
    ketasu = 999;
  } else if (level == "level6") {
    // 桁数を変更
    ketasu = 999;
    ope = "-";
  } else if (level == "level9") {
    // 桁数を変更
    ketasu = 999;
    ope = "×";
  } else if (level == "level12") {
    // 桁数を変更
    ketasu = 999;
    ope = "÷";
  }

  // 表示する計算式の演算子を書き換え
  document.getElementById("operator").innerText = ope;

  // 左辺と右辺の要素を取得し、ランダムな整数を代入
  test1 = Math.floor(Math.random() * ketasu);
  first.innerText = test1;
  test2 = Math.floor(Math.random() * ketasu);
  second.innerText = test2;
  // ひき算の時は左辺＞右辺となるよう調整
  if (level == "level4" || level == "level5" || level == "level6") {
    if (test2 > test1) {
      first.innerText = test2;
      second.innerText = test1;
    } else {
      first.innerText = test1;
      second.innerText = test2;
    }
    // 割り算の時は割り切れる数値になるまでランダムに抽出
  } else if (level == "level10" || level == "level11" || level == "level12") {
    let choice1 = Math.floor(Math.random() * ketasu + 1);
    let choice2 = Math.floor(Math.random() * ketasu + 1);
    while (choice1 % choice2 !== 0) {
      choice1 = Math.floor(Math.random() * ketasu + 1);
      choice2 = Math.floor(Math.random() * ketasu + 1);
    }
    test1 = choice1;
    first.innerText = test1;
    test2 = choice2;
    second.innerText = test2;
  }

  // 計算式の変更
  if (level == "level1" || level == "level2" || level == "level3") {
    keisan = test1 + test2;
  } else if (level == "level4" || level == "level5" || level == "level6") {
    if (test2 > test1) {
      keisan = test2 - test1;
    } else {
      keisan = test1 - test2;
    }
  } else if (level == "level10" || level == "level11" || level == "level12") {
    keisan = test1 / test2;
  } else {
    keisan = test1 * test2;
  }
};

// 正解数カウンターの関数定義
let seitou = 0;
function seikaiUp() {
  seitou += 1;
}

// 連続正解数カウンターの関数定義
let renzoku = 0;
function renzokuUp() {
  renzoku += 1;
}

// 問題数カウンターの関数定義
let count = 0;
function countUp() {
  count += 1;
}

// あってるかな？ボタンクリックで正誤判定
document.getElementById("check").onclick = function kakunin() {
  clearInterval(timer);

  // 問題数のカウントアップ
  countUp();
  // 変数kotaeにanswerの入力値を代入
  let kotae = document.getElementById("answer").value;
  // kotaeとkeisan結果の正誤判定し条件分岐させ、画像とメッセージ表示を切り替え
  if (kotae == keisan) {
    document.getElementById("image").setAttribute("src", "2562575.jpg");
    document.getElementById("message").innerText = "せいかい！！";
    seikaiUp();
    renzokuUp();
    my_audio.volume = 0.2;
    ansVoice.play();
  } else {
    document.getElementById("image").setAttribute("src", "2562567.jpg");
    document.getElementById("message").innerText = `ざんねん...せいかいは
    『 ${keisan} 』だよ`;
    renzoku = 0;
    my_audio.volume = 0.2;
    missVoice.play();
  }
  // answerをブランクに
  document.getElementById("answer").value = "";
  // 挑戦中の問題数と正解数を表示
  document.getElementById(
    "kaisu"
  ).innerText = `${count} 問中 ${seitou} 問正解！`;
  // 問題数・連続正解数の一定数以上でメッセージ
  if (count >= 10 && renzoku >= 10) {
    document.getElementById("shousan").innerText = "もはや神...!";
    my_audio.volume = 0.2;
    ansVoice.volume = 0;
    fiveVoice.play();
  } else if (count >= 5 && renzoku >= 5) {
    document.getElementById("shousan").innerText = "すごい---!";
  } else {
    document.getElementById("shousan").innerText = "";
  }
};

document.getElementById("reset").onclick = function rst() {
  // 正誤判定の画像とテキストをリセット
  document.getElementById("image").setAttribute("src", "");
  document.getElementById("message").innerText = "";
  seitou = 0;
  count = 0;
  renzoku = 0;
  document.getElementById("kaisu").innerText = "";
  document.getElementById("shousan").innerText = "";
  first.innerText = "";
  second.innerText = "";
  my_audio.pause();
  my_audio.currentTime = 0;
  ansVoice.pause();
  missVoice.pause();
  fiveVoice.pause();
};
