using System.Security.Cryptography.X509Certificates;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Cors;

namespace ItemInventory.Models
{

    public class Item
    {
        [Key]
        public int Id {  get; set; }
        public string name { get; set; }
        public string brand { get; set; }
        public int price { get; set; }
        public int quantity { get; set; }

    }
}
