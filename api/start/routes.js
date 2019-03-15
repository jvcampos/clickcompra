'use strict'

const Route = use('Route')

Route.group(() => {
  Route.post('login', 'SessionController.createSession')

  Route.post('supermarket', 'SupermarketController.create')
  Route.patch('supermarket/:id', 'SupermarketController.update').middleware('auth')

  Route.post('user', 'UserController.create');

  Route.post('category', 'CategoryController.create').middleware('auth')

  Route.post('product', 'ProductController.create').middleware('auth')
})
 .prefix('api');
