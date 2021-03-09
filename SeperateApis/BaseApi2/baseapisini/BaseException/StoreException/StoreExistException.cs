using System;
using System.Collections.Generic;
using System.Text;

namespace BaseExceptions.StoreException
{
    public class StoreExistException:ApplicationException
    {
        public StoreExistException(string message) : base(message) { }
    }
}
