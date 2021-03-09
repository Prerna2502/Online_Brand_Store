using System;
using System.Collections.Generic;
using System.Text;

namespace BaseExceptions.ProductException
{
    public class WrongProductIdException:ApplicationException
    {
        public WrongProductIdException() { }
        public WrongProductIdException(string message) : base(message) { }
    }
}
