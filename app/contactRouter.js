const transporter = require("./utils/mail-transporter");

const queryMail = async (req, res) => {
  const { email, phone, query } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: process.env.DEVELOPER_MAIL,
    subject: "[CONTACT US]: ALLISONE",
    html: `
      <p>EMAIL: ${email}</p>
      <p>PHONE: ${phone}</p>

      <p>Query: ${query}</p>
    `,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err,
      });
    } else {
      res.status(200).send({
        status: "success",
      });
    }
  });
};

module.exports = queryMail;
