using System;
using System.Collections.Generic;
using System.Text;

namespace BaseExceptions.StockException
{
    public class StockExistException:ApplicationException
    {
        public StockExistException() { }
        public StockExistException(string message):base(message) { }
    }
}
