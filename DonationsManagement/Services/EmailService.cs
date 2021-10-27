using DonationsManagement.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonationsManagement.Services
{
    public interface IEmailService
    {
        void Send(string from, string to, string subject, string html);
    }

    public class EmailService : IEmailService
    {
        private readonly MailSettings _appSettings;

        public EmailService(IOptions<MailSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public void Send(string from, string to, string subject, string html)
        {
            try
            {
                // create message
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(from));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = html };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect(_appSettings.Host, 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(_appSettings.Mail, _appSettings.Password);
                smtp.Send(email);
                smtp.Disconnect(true);
            }
            catch(Exception ex)
            {
                var g = ex;
            }
        }
    }
}
