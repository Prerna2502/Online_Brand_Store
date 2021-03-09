using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace AuthModels
{
    public class Employee
    {
        [BsonId]
        public string EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string Designation { get; set; }
        public string StoreId { get; set; }
    }
}
