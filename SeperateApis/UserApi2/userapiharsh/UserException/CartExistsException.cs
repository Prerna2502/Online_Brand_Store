using System;

namespace UserException
{
    public class CartExistsException:ApplicationException
    {
        public CartExistsException() { }
        public CartExistsException(string message) : base(message) { }
    }
}
