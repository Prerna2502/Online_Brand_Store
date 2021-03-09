using System;
using System.Collections.Generic;

#nullable disable

namespace UserModels
{
    public partial class Order
    {
        public string OrderId { get; set; }
        public string ProductId { get; set; }
        public string CustomerId { get; set; }
        public string StoreId { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public int Quantity { get; set; } 
        public string OrderStatus { get; set; }
        public DateTime? OrderDateTime { get; set; }
    }
}
