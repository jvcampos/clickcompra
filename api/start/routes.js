'use strict'

const Route = use('Route')

Route.group(() => {
  // NOTE Routes to acess, bouth web and mobile.
  Route.post('login', 'SessionController.createSession')
  Route.get('logout', 'SessionController.sessionLogout').middleware('auth')

  Route.post('user', 'UserController.create');
  Route.put('user/:id', 'UserController.update').middleware('auth')
  Route.delete('user/:id', 'UserController.delete').middleware('auth')
  Route.get('user/:id', 'UserController.getUser').middleware('auth')
  Route.get('users', 'UserController.getAll').middleware('auth')

  // NOTE Routes to supermarkets.
  Route.post('supermarket', 'SupermarketController.create')
  Route.put('supermarket/:id', 'SupermarketController.update').middleware('auth')
  Route.delete('supermarket/:id', 'SupermarketController.delete').middleware('auth')
  Route.get('supermarket/:id', 'SupermarketController.getSupermarket').middleware('auth')
  Route.get('supermarkets/unproved', 'SupermarketController.getSupermarketUnproved').middleware('auth')
  Route.put('supermarket/aproved/:id', 'SupermarketController.aproveSupermarket')
  Route.get('supermarkets', 'SupermarketController.getAll').middleware('auth')
  Route.get('supermarketsMobile', 'SupermarketController.getAllSupermarketsMobile')

  // NOTE Routes to categories.
  Route.post('category', 'CategoryController.create').middleware('auth')
  Route.put('category/:id', 'CategoryController.update').middleware('auth')
  Route.delete('category/:id', 'CategoryController.delete').middleware('auth')
  Route.get('category/:id', 'CategoryController.getCategory').middleware('auth')
  Route.get('categories', 'CategoryController.getAllCategories')

  // NOTE Routes to products.
  Route.post('product', 'ProductController.create').middleware('auth')
  Route.put('product/:id', 'ProductController.update').middleware('auth')
  Route.delete('product/:id', 'ProductController.delete').middleware('auth')
  Route.get('product/:id_category', 'ProductController.getProduct')
  Route.get('products', 'ProductController.getAllMobile')
  Route.get('product/:id', 'ProductController.getAll').middleware('auth')
  Route.get('products/:id_supermarket', 'ProductController.getAllProducts')

  // Routes to cart
  Route.post('cart', 'CartController.addOrCreate')
  Route.get('cart/:user_id', 'CartController.getCart')
  Route.post('cart/bestsupermarkets/:user_id', 'CartController.getBetterSupermarket')

  Route.get('allOrders/:user_id', 'OrderController.allOrders')
  Route.post('finalizarCompra', 'FinalizarCompraController.finalizarCompra')
})
  .prefix('api')
