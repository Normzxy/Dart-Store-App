namespace Core.Entities;

// Related tu user, but not related to identity.
public class Address : BaseEntity
{
    // This names are used in Stripe payment processor.
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string State { get; set; }
    public required string City { get; set; }
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
}