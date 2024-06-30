using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User:IdentityUser
    {
        [Required(ErrorMessage ="Email is mandatory")]
        [EmailAddress(ErrorMessage ="Incorrect Email format")]
        public override string Email { get => base.Email; set => base.Email = value; }
    }
}