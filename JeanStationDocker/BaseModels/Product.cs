using System;
using System.Collections.Generic;

#nullable disable

namespace BaseModels
{
    public partial class Product
    {
        public Product()
        {
            Stocks = new HashSet<Stock>();
        }

        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductType { get; set; }
        public string ProductImage { get; set; }
        public string Description { get; set; }
        public string Gender { get; set; }
        public string FilterTag { get; set; }

        public virtual ICollection<Stock> Stocks { get; set; }
    }
}
