using System;
using System.Collections.Generic;

#nullable disable

namespace OrderDiscountModels
{
    public partial class Discount
    {
        public decimal MinimumOrderAmount { get; set; }
        public int? MinimumPastOrder { get; set; }
        public decimal DiscountPercent { get; set; }
    }
}
