using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace AuthModels
{
    public class Customer
    {
        [BsonId]
        public string CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public string Password { get; set; }
        public List<string> Addresses { get; set; }
        public string PastOrderCount { get; set; }
    }
}
