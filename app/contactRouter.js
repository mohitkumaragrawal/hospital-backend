const transporter = require("./utils/mail-transporter");

const queryMail = async (req, res) => {
  const { email, phone, query } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Query Received",
    html: `<p>Your query "${query}" has been received successfully. Our officials will contact you soon on your number ${phone}</p>`,
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
