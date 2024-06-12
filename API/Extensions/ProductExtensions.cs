using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Npgsql.Replication;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);
            query = orderBy.ToLower() switch
            {
                "name" => query.OrderBy(p => p.Name),
                "price" => query.OrderBy(p => p.Price),
                "type" => query.OrderBy(p => p.Type),
                "id" => query.OrderBy(p => p.Id),
                "namedesc" => query.OrderByDescending(p => p.Name),
                "pricedesc" => query.OrderByDescending(p => p.Price),
                "typedesc" => query.OrderByDescending(p => p.Type),
                "iddesc" => query.OrderByDescending(p => p.Id),
                _ => query.OrderBy(p => p.Name),
            };
            return query;

        }
        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));

        }
        public static IQueryable<Product>Filter(this IQueryable<Product> query,string brands,string type){
            var brandList=new List<string> ();
            List<string> typeList=new();
            if (!string.IsNullOrEmpty(brands))
            brandList.AddRange(brands.Trim().ToLower().Split(",").ToList());
            if (!string.IsNullOrEmpty(type))
            typeList.AddRange(type.ToLower().Split(",").ToList());

            query=query.Where(p=>brandList.Count==0||brandList.Contains(p.Brand.ToLower()));
            query=query.Where(p=>typeList.Count==0||typeList.Contains(p.Type.ToLower()));
            return query;

        }

    }
}