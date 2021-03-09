using System;
using System.Collections.Generic;
using System.Text;

namespace BaseExceptions.StoreException
{
    public class StoreNotFoundException:ApplicationException
    {
        public StoreNotFoundException() { }
        public StoreNotFoundException(string message):base(message) { }
    }
}
