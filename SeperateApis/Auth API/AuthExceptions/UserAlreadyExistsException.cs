using System;
using System.Collections.Generic;
using System.Text;

namespace AuthExceptions
{
    public class UserAlreadyExistsException : ApplicationException
    {
        public UserAlreadyExistsException() : base() { }
        public UserAlreadyExistsException(string message) : base(message) { }
    }
}
