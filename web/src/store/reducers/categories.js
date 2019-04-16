export default function categories(state = [] , action) {
  console.log(action)
  console.log(state);
  switch (action.type) {
      case 'ADD_CATEGORY':
       return [
          ...state,
         {
           id: action.data.id,
           name_categorie: action.data.categorie,
           description: action.data.description
         }
       ]
       default:
       return state;
    }
}
