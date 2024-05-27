using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.SignalR;

namespace API.Services
{
    public interface IEFStoreRepository
    {
        public  Task<IEnumerable<Product>> GetProducts();
        public Task<IEnumerable<Basket>> GetBaskets();
        public Task<Basket>GetBasketByIdAsync(string buyerId);
        // public Task<BasketItem>GetBasketItemAsync(int basketId,int producId);
 
    }
}