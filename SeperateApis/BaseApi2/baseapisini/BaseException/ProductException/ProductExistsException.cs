using System;
using System.Collections.Generic;
using System.Text;

namespace BaseExceptions.ProductException
{
    public class ProductExistsException:ApplicationException
    {
        public ProductExistsException() { }
        public ProductExistsException(string message) : base(message) { }
    }
}
