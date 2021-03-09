using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace AuthModels
{
    public class Admin
    {
        [BsonId]
        public string AdminId { get; set; }
        public string AdminPassword { get; set; }
    }
}
