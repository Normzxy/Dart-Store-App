using System;
using System.Security.Cryptography.X509Certificates;
using Core.Entities;

namespace Core.Specifications;

public class ProductSpecification : BaseSpecification<Product>
{
    // If property is null, nothing happens (return true), but if it's not null it gets assigned.
    public ProductSpecification(ProductSpecificationParams parameters) : base(x =>
        (string.IsNullOrEmpty(parameters.Search) || x.Name.ToLower().Contains(parameters.Search)) &&
        (parameters.Brands.Count == 0 || parameters.Brands.Contains(x.Brand)) &&
        (parameters.Types.Count == 0 || parameters.Types.Contains(x.Type))
    )
    {
        ApplyPaging(parameters.PageSize * (parameters.PageIndex -1), parameters.PageSize);

        switch (parameters.Sort)
        {
            case "priceAsc":
                AddOrderBy(x => x.Price);
                break;
            case "priceDsc":
                AddOrderByDescending(x => x.Price);
                break;
            default:
                AddOrderBy(x => x.Name);
                break;
        }
    }
}