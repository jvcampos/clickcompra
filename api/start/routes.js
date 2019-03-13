'use strict'

const Route = use('Route')

Route.group(() => {
  //TODO fazer alterar
  Route.post('supermarket', 'SupermarketController.create');
  //TODO fazer alterar
  Route.post('manager', 'ManagerController.create');
 //TODO Fazer o alterar
  Route.post('category', 'CategoryController.create');


})
 .prefix('api');
