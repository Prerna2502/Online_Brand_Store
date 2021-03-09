using System;
using System.Collections.Generic;
using System.Text;

namespace BaseExceptions.StoreException
{
    public class WrongStoreIdException:ApplicationException
    {
        public WrongStoreIdException() { }
        public WrongStoreIdException(string message) : base(message) { }
    }
}
