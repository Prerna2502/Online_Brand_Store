using System;
using System.Collections.Generic;
using System.Text;

namespace UserException
{
    public class NoCustomerExistsException:ApplicationException
    {
        public NoCustomerExistsException() { }
        public NoCustomerExistsException(string message) : base(message) { }
    }
}
