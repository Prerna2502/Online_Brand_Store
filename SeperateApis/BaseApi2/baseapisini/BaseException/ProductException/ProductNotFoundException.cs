using System;
using System.Collections.Generic;
using System.Text;

namespace BaseExceptions.ProductException
{
    public class ProductNotFoundException:ApplicationException
    {
        public ProductNotFoundException() { }
        public ProductNotFoundException(string message):base(message) { }
    }
}
