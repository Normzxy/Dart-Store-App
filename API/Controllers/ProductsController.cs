using API.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// Now it is not necessary to put [FromQuery] before method arguments.
public class ProductsController(IGenericRepository<Product> repository) : BaseApiController
{
  [HttpGet]
  // Async used not to block thread, in case database operation turns out to be long.
  public async Task<ActionResult<IReadOnlyList<Product>>>GetProducts(
        [FromQuery]ProductSpecificationParams parameters)
  {
        // Expression for filtering, sorting and searching.
        var specification = new ProductSpecification(parameters);

        // Needs to be wrapped up, for return type compability.
        return await CreatePagedResult(repository, specification, parameters.PageIndex, parameters.PageSize);
  }

  [HttpGet("{id:int}")]
  public async Task<ActionResult<Product>> GetProduct(int id)
  {
        var product = await repository.GetByIdAsync(id);

        if(product == null) return NotFound();

        return product;
  }

  [HttpPost]
  public async Task<ActionResult<Product>> CreateProduct(Product product)
  {
      repository.Add(product);

      if(await repository.SaveAllAsync())
      {
          // Use GetProduct with id parameter, and return product
          // with 201 response in Location header as {{url}}/api/products/id.
          return CreatedAtAction("GetProduct", new {id = product.Id}, product);
      }

      return BadRequest("Something went wrong. Cannot create.");
  }

  [HttpPut("{id:int}")]
  public async Task<ActionResult> UpdateProduct(int id, Product product)
  {
      if (product.Id != id || !ProductExists(id))
        return BadRequest("Something went wrong. Cannot update.");

      repository.Update(product);

      if(await repository.SaveAllAsync())
      {
          return NoContent();
      }

      return BadRequest("Something went wrong. Cannot update.");
  }

  [HttpDelete ("{id:int}")]
  public async Task<ActionResult> DeleteProduct(int id)
  {
      var product = await repository.GetByIdAsync(id);

      if (product == null) return NotFound();

      repository.Remove(product);

      if(await repository.SaveAllAsync())
      {
          return NoContent();
      }

      return BadRequest("Something went wrong. Cannot delete.");
  }

  [HttpGet("brands")]
  public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
  {
      var specification = new BrandListSpecification();
      return Ok(await repository.ListAsync(specification));
  }

  [HttpGet("types")]
  public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
  {
      var specification = new TypeListSpecification();
      return Ok(await repository.ListAsync(specification));
  }

  private bool ProductExists(int id) {
      return repository.Exists(id);
  }
}