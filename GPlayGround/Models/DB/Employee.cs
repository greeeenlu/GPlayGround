using System;
using System.Collections.Generic;

namespace GPlayGround.Models.DB
{
    public partial class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public int? Age { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }
}
