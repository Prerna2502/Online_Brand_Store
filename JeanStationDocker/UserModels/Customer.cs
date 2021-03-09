using System;
using System.Collections.Generic;

#nullable disable

namespace UserModels
{
    public partial class Customer
    {
        public string CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int? PastOrderCount { get; set; }
    }
}
