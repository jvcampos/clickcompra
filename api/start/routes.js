'use strict'

const Route = use('Route')

Route.group(() => {
  Route.post('supermarket', 'SupermarketController.create');

  Route.post('manager', 'ManagerController.create')
})
 .prefix('api');
