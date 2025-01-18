using System;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data;

public class SpecificationEvaluator<T> where T : BaseEntity
{
    public static IQueryable<T> GetQuery(IQueryable<T> query, ISpecification<T> specification)
    {
        // At this moment query is only IQueryable.
        // Query expression tree (to be passed to database)
        // is being build in this class based on specification provided.

        if(specification.Criteria != null)
        {
            query = query.Where(specification.Criteria);
        }

        if(specification.OrderBy != null)
        {
            query = query.OrderBy(specification.OrderBy);
        }

        if(specification.OrderByDescending != null)
        {
            query = query.OrderByDescending(specification.OrderByDescending);
        }

        if(specification.IsDistinct)
        {
            query = query.Distinct();
        }

        return query;
    }

    // Now it has to return IQuerable<TResult>.
    // TResult is possibly different type from T, but it can be obtained from T.
    public static IQueryable<TResult> GetQuery<TSpecification, TResult>
        (IQueryable<T> query, ISpecification<T, TResult> specification)
    {
        if(specification.Criteria != null)
        {
            query = query.Where(specification.Criteria);
        }

        if(specification.OrderBy != null)
        {
            query = query.OrderBy(specification.OrderBy);
        }

        if(specification.OrderByDescending != null)
        {
            query = query.OrderByDescending(specification.OrderByDescending);
        }

        var selectQuery = query as IQueryable<TResult>;

        if(specification.Select != null)
        {
            // Select Expression to obtain TResult from T.
            selectQuery = query.Select(specification.Select);
        }

        if(specification.IsDistinct)
        {
            selectQuery = selectQuery?.Distinct();
        }

        // If selectQuery is null, return query.
        // Has to be casted, to keep proper return type.
        return selectQuery ?? query.Cast<TResult>();
    }
}
