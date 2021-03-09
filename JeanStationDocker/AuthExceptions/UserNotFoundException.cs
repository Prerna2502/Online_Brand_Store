using System;
using System.Collections.Generic;
using System.Text;

namespace AuthExceptions
{
    public class UserNotFoundException : ApplicationException
    {
        public UserNotFoundException() : base() { }
        public UserNotFoundException(string message) : base(message) { }
    }
}
