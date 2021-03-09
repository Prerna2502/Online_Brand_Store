using System;
using System.Collections.Generic;

#nullable disable

namespace UserModels
{
    public partial class Cart
    {
        public string CustomerId { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
