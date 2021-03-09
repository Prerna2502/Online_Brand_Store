using System;
using System.Collections.Generic;

#nullable disable

namespace BaseModels
{
    public partial class Store
    {
        public Store()
        {
            Stocks = new HashSet<Stock>();
        }

        public string StoreId { get; set; }
        public string Location { get; set; }
        public string Manager { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Stock> Stocks { get; set; }
    }
}
