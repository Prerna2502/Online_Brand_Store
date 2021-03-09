using System;
using System.Collections.Generic;
using System.Text;

namespace AuthModels
{
    public class BaseAdmin
    {
        public string AdminId { get; set; }
        public string AdminPassword { get; set; }
        public static BaseAdmin Instance { get; protected set; } = new BaseAdmin();
    }
}
