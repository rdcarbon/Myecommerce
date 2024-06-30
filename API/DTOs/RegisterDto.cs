using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required(AllowEmptyStrings =false,ErrorMessage ="Define a ProperUserName")]
        public string UserName{get;set;}
       [Required(ErrorMessage ="Email is required")]
     //  [EmailAddress(ErrorMessage ="Enter a proper email address")]
        public string Email{get;set;}
        public string Password{get;set;}
    }
}