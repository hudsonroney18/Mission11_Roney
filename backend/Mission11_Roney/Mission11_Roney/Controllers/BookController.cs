namespace Mission11_Roney.Controllers;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Roney.Data;


    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _context;

        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("book", Name = "GetBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        {
            var something = _context.Books
                .Skip((pageNum-1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _context.Books.Count();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };
            return Ok(someObject);
        }
        
    }

