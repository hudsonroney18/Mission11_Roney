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
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookCategories = null)
    {
        IQueryable<Book> query = _context.Books.AsQueryable();

        if (bookCategories != null && bookCategories.Any())
        {
            query = query.Where(b => bookCategories.Contains(b.Category ?? ""));
        }

        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var totalNumBooks = query.Count();

        var result = new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        };
        return Ok(result);
    }

    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var bookCategories = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        return Ok(bookCategories);
    }

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{BookID}")]
    public IActionResult UpdateBook(int BookID, [FromBody] Book updatedBook)
    {
        var existingBook = _context.Books.Find(BookID);
        if (existingBook == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _context.Books.Update(existingBook);
        _context.SaveChanges();

        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{BookID}")]
    public IActionResult DeleteBook(int BookID)
    {
        var book = _context.Books.Find(BookID);
        if (book == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        _context.Books.Remove(book);
        _context.SaveChanges();

        return NoContent();
    }
}
