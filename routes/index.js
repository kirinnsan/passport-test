var express = require('express');
var router = express.Router();
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

const data = {
  name: "Taro",
  password: "Taro123"
}

passport.serializeUser((username, done) => {
  console.log("★serializeUser★", username);
  return done(null, username);
});

passport.deserializeUser((username, done) => {
  console.log("★deserializeUser★", username);
  return done(null, username);
});


// 引数のusername、passwordにはフォームのname部分を設定する
passport.use("local", new LocalStrategy((
  username,
  password,
  done) => {
  console.log("認証実行");
  // 認証処理
  if (username === 0 || username !== data.name) {
    console.log("ユーザーIDが正しくありません。")
    return done(null, false, { message: 'ユーザーIDが正しくありません。' });
  }
  if (password === 0 || password !== data.password) {
    console.log("パスワードが正しくありません。")
    return done(null, false, { message: 'パスワードが正しくありません。' });
  }
  return done(null, username);
}))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", (req, res) => {
  res.render("./login.ejs", { message: req.flash('error') });
})

router.get("/success", (req, res) => {
  res.send('login success');
})

// passport.authenticate() には、post() で受け取った username と password が渡されます。
// passport.authenticate()の第一引数にはストラテジーを呼び出すために使う一意な名前を指定します
//（passport.useの第一引数と同じ名前にします！！）
// 上記で準備した認証確認する処理が実行され、その結果が返ってきます。
// リダイレクトは、一般的にリクエストの認証後におこなわれます。
router.post("/login", passport.authenticate("local", {
  successRedirect: "/success",
  failureRedirect: "/login",
  failureFlash: true,
  // session: false
}))

module.exports = router;
