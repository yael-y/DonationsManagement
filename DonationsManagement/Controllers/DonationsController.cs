using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using DonationsManagement.Models;
using DonationsManagement.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DonationsManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationsController : ControllerBase
    {
        private static List<DonationModel> donationsList = new List<DonationModel>()
        {
            new DonationModel()
            {

                Id = 0,
                EntityName ="יישות 1",
                EntityType = "מדינה זרה",
                Sum ="50",
                Conditions = "תנאי 1",
                Designation = "ייעוד 1",
                CurrencyType ="דולר ארהב",
                RateConversion = "3.4"
            },
             new DonationModel()
            {
                Id = 1,
                EntityName ="יישות 2",
                EntityType = "סוג 2",
                Sum ="100",
                Conditions = "תנאי 2",
                Designation = "ייעוד 2",
                CurrencyType ="שקל",
                RateConversion = "1"
            }
        };

        private readonly IEmailService mailService;
        public DonationsController(IEmailService mailService)
        {
            this.mailService = mailService;
        }

        // GET: api/Donations
        [HttpGet]
        public ActionResult<IEnumerable<DonationModel>> Get()
        {
            return donationsList;
        }

        // GET: api/Donations/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<DonationModel> Get(int id)
        {
            return donationsList.FirstOrDefault(x => x.Id == id);
        }

        // POST: api/Donations
        [HttpPost]
        public bool Post([FromBody] DonationModel value)
        {
            if (ModelState.IsValid)
            {
                value.Id = donationsList.Count();
                donationsList.Add(value);
                int sum = (int)float.Parse(value.Sum);
                if (sum > 1000)
                {
                    mailService.Send("byeyme@gmail.com", "byeyme@gmail.com", "תרומתך התקבלה בהצלחה", "<h1>רק רוצים לומר לך תודה על תרומתך הנדיבה!!!</h1>");
                }
                return true;
            }
            return false;
        }

        // PUT: api/Donations/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] DonationModel value)
        {
            if (ModelState.IsValid)
            {
                var item = donationsList.Find(x => x.Id == id);
                item.EntityName = value.EntityName;
                item.EntityType = value.EntityType;
                item.Sum = value.Sum;
                item.RateConversion = value.RateConversion;
                item.Designation = value.Designation;
                item.Conditions = value.Conditions;
                item.CurrencyType = value.CurrencyType;
                int sum = (int)float.Parse(value.Sum);
                if (sum > 1000)
                {
                    mailService.Send("byeyme@gmail.com", "byeyme@gmail.com", "תרומתך התקבלה בהצלחה", "<h1>רק רוצים לומר לך תודה על תרומתך הנדיבה!!!</h1>");
                }
                return true;
            }
            return false;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
           donationsList.Remove(donationsList.Find(x => x.Id == id));
            return true;
        }
    }
}
