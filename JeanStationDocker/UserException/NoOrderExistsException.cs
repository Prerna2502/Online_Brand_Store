using System;
using System.Collections.Generic;
using System.Text;

namespace UserException
{
    public class NoOrderExistsException:ApplicationException
    {
        public NoOrderExistsException() { }
        public NoOrderExistsException(string message) : base(message) { }
    }
}
