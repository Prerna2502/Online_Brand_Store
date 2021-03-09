using System;
using System.Collections.Generic;
using System.Text;

namespace UserException
{
    public class OrderExistsException:ApplicationException
    {
        public OrderExistsException() { }
        public OrderExistsException(string message) : base(message) { }
    }
}
