using System;
using System.Collections.Generic;
using System.Text;

namespace OrderDiscountException
{
    public class DiscountExist:ApplicationException
    {
        public DiscountExist() { }
        public DiscountExist(string message) : base(message) { }
    }
}
