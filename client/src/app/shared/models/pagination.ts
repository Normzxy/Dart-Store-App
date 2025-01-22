// Giving the product component type of any (in app.component.ts) doesn't benefit from the type safety provided by TypeScript.
// Angular is build on TypeScript, so it's beneficial to create types for what is being returned from server API.

export type Pagination<T> = {
  pageIndex: number
  pageSize: number
  count: number
  data: T[]
}

export type ApiResponse<T> = {
  value: Pagination<T>;
};