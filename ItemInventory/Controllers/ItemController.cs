using ItemInventory.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ItemInventory.Controllers
{

    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ItemDbContext _itemDbContext;

        public ItemController(ItemDbContext itemDbContext)
        {
            _itemDbContext = itemDbContext;
        }

        [HttpGet]
        [Route("GetItem")]
        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _itemDbContext.Item.ToListAsync();
        }

        [HttpPost]
        [Route("AddItem")]
        public async Task<Item> AddItem(Item objItem)
        {
            _itemDbContext.Item.Add(objItem);
            await _itemDbContext.SaveChangesAsync();
            return objItem;
        }

        [HttpPatch]
        [Route("UpdateItem/{Id}")]
        public async Task<Item> UpdateItem(Item objItem)
        {
            _itemDbContext.Entry(objItem).State = EntityState.Modified;
            await _itemDbContext.SaveChangesAsync();
            return objItem;
        }

        [HttpDelete]
        [Route("DeleteItem/{Id}")]
        public bool DeleteItem(int Id)
        {
            bool a = false;
            var item = _itemDbContext.Item.Find(Id);
            if (item != null)
            {
                a = true;
                _itemDbContext.Entry(item).State = EntityState.Deleted;
                _itemDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;

        }

    }


}
