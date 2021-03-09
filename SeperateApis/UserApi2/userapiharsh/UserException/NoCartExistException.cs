using System;
using System.Collections.Generic;
using System.Text;

namespace UserException
{
    public class NoCartExistException:ApplicationException
    {
        public NoCartExistException() { }
        public NoCartExistException(string message) : base(message) { }
    }
}
