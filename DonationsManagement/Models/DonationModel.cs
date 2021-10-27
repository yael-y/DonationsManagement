using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DonationsManagement.Models
{
    public class DonationModel
    {
        public Nullable<int> Id { get; set; }
        [Required]
        [RegularExpression(@"^[A-Za-z\u0590-\u05fe 0-9]+$",
         ErrorMessage = "Characters are not allowed.")]
        public string EntityName { get; set; }
        [Required]
        public string EntityType { get; set; }
        [Required]
        [RegularExpression(@"^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$",
         ErrorMessage = "Characters are not allowed.")]
        public string Sum { get; set; }
        [Required]
        public string Designation { get; set; }
        public string Conditions { get; set; }
        [Required]
        public string CurrencyType { get; set; }
        [Required]
        [RegularExpression(@"^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$",
         ErrorMessage = "Characters are not allowed.")]
        public string RateConversion { get; set; }
    }
}
