var async = require("async");
var http = require("http");
var nodemailer = require("nodemailer");
var listofemails = ["sumithdeepan@gmail.com", "sumithdeepan@gmail.com"];
var success_email = [];
var failure_email = [];

var transporter;


function massMailer() {
    var self = this;
    transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "sullansumith@gmail.com",
            pass: "sumithgggdeepan"
        }
    });
    self.invokeOperation();
};


massMailer.prototype.invokeOperation = function () {
    var self = this;
    async.each(listofemails, self.SendEmail, function () {
        console.log(success_email);
        console.log(failure_email);
    });
}

massMailer.prototype.SendEmail = function (Email, callback) {
    console.log("Sending email to " + Email);
    var self = this;
    self.status = false;
    async.waterfall([
        function (callback) {
            var mailOptions = {
                from: 'sullasumith@gmail.com',
                to: Email,
                subject: 'Hi ! This is from Async Script',
                text: "Hello World !"
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    failure_email.push(Email);
                } else {
                    self.status = true;
                    success_email.push(Email);
                }
                callback(null, self.status, Email);
            });
        },
        function (statusCode, Email, callback) {
            console.log("Will update DB here for " + Email + "With " + statusCode);
            callback();
        }
    ], function () {
        callback();
    });
}

new massMailer(); 