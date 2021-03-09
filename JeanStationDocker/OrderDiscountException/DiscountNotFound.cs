using System;
using System.Collections.Generic;
using System.Text;

namespace OrderDiscountException
{
    public class DiscountNotFound:ApplicationException
    {
        public DiscountNotFound() { }
        public DiscountNotFound(string message):base(message){ }
    }
}
