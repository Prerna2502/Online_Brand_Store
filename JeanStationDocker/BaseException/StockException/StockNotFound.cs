using System;
using System.Collections.Generic;
using System.Text;

namespace BaseExceptions.StockException
{
    public class StockNotFound:ApplicationException
    {
        public StockNotFound() { }
        public StockNotFound(string message) : base(message) { }
    }
}
