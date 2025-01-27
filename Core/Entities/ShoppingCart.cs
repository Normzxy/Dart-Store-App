using System.Data.Common;

namespace Core.Entities;

public class ShoppingCart
{
  public required string Id { get; set; }
  public List<CartItem> Items { get; set; } = [];
}
