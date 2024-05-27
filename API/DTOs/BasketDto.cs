using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
namespace API.DTOs
{
    public class BasketDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; } = new();

        public BasketDto(Basket basket)
        {
            Id = basket.Id;
            BuyerId = basket.BuyerId;
            Items = basket.Items
            .Select(item => new BasketItemDto(item))
            .ToList();
        }
    }

    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ulong Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        // public  ulong QuantityInStock{get;set;}

        public BasketItemDto(BasketItem item)
        {
            ProductId = item.ProductId;
            Quantity = item.Quantity;
            Name = item.Product.Name;
            Description = item.Product.Description;
            Price = item.Product.Price;
            PictureUrl = item.Product.PictureUrl;
            Type = item.Product.Type;
            Brand = item.Product.Brand;
            //   QuantityInStock=item.Product.QuantityInStock;

        }
    }
}