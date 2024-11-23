using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ShippingAddress { get; set; }
        public List<CartItem> Items { get; set; }
    }

    public class CartItem
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

}
