const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const gmailAccount = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
exports.emailMessage = functions.https.onCall((data, context) => {
  const { name, email, phone, facebook, uid, sid, time } = data.info;

  let text = `<div style={color: black}>
      <p>Chào bạn ${name || ""},</p>
      <p>CLB F-Code xác nhận thông tin cá nhân của bạn như sau:</p>
      <ol>
        <li>
          Họ và tên: ${name || ""}
        </li>
        <li>
          Mã sinh viên: SE${sid || ""}
        </li>
        <li>
          Email: ${email || ""}
        </li>
        <li>
          Số điện thoại: ${phone || ""}
        </li>
        <li>
          Địa chỉ Facebook: ${facebook || ""}
        </li>
      </ol>
      <h4>Nếu thông tin của bạn là chính xác, vui lòng xác nhận tại link dưới đây:</h4>
      <a href="https://fcode-fpthcm-k15-application.web.app/verify/uid=${uid}&sid=${sid}&time=${time}">Click vào đây để xác nhận.</a>
      <div style={color: red}>Lưu ý: link chỉ có hiệu lực trong vòng 60 phút.</div>
      <h4>Nếu một ai đó đang dùng Gmail của bạn để đăng ký, vui lòng bỏ qua email này.</h4>
      <p>Thân ái,</p>
      <p>Câu Lạc Bộ Học Thuật F-Code.</p>
    </div>`;

  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: gmailAccount,
        pass: gmailPassword
      }
    })
  );
  const mailOptions = {
    to: email,
    from: "no-reply@f-code.com",
    subject: "Xác nhận thông tin đăng ký tham gia CLB F-Code",
    text: text,
    html: text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error.message);
    }
  });
});
