using System;
using System.Linq.Expressions;

namespace Core.Interfaces;

// List of all methods that we want our specification pattern to support.
// Helps to perform class-specific actions in a generic class.
public interface ISpecification<T>
{
    Expression<Func<T, bool>>? Criteria { get; }
    Expression<Func<T, object>>? OrderBy { get; }
    Expression<Func<T, object>>? OrderByDescending { get; }
    bool IsDistinct { get; }
}

// Makes possible returning other type than T (projection).
public interface ISpecification<T, TResult> : ISpecification<T>
{
    Expression<Func<T, TResult>>? Select { get; }
}