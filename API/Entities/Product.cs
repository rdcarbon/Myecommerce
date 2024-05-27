// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public class Product
    {
        
        public int Id{get;set;}
        public string Name {get;set;}
        public string Description{get;set;}
        public ulong Price {get;set;}
        public string PictureUrl{get;set;}
        public string Type{get;set;}
        public string Brand{get;set;} 
        public  ulong QuantityInStock{get;set;}


    }
}