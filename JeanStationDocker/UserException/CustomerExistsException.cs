using System;
using System.Collections.Generic;
using System.Text;

namespace UserException
{
    public class CustomerExistsException:ApplicationException
    {
        public CustomerExistsException() { }
        public CustomerExistsException(string message) : base(message) { }
    }
}
