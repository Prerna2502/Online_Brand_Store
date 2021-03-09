using System;
using System.Collections.Generic;

#nullable disable

namespace BaseModels
{
    public partial class Stock
    {
        public string StoreId { get; set; }
        public string ProductId { get; set; }
        public int? Quantity { get; set; }

        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
