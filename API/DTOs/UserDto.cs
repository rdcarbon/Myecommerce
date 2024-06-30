using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.DTOs
{
    public class UserDto
    {
        public string UserName{get;set;}
        public string Email{get;set;}
        public string Token{get;set;}
        public BasketDto Basket{get;set;}
   

    }
}