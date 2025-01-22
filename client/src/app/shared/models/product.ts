// Giving the product component type of any (in app.component.ts) doesn't benefit from the type safety provided by TypeScript.
// Angular is build on TypeScript, so it's beneficial to create types for what is being returned from server API.

export type Product = {
  // Names same as in server API for binding.
  id: number
  name: string
  description: string
  price: number
  pictureUrl: string
  type: string
  brand: string
  quantityInStock: number
}