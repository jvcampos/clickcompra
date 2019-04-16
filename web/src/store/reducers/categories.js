export default function categories(state = [] , action) {
  console.log(action.data)
  // console.log(state);
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
       // eslint-disable-next-line no-duplicate-case
       case 'GET_ALL_CATEGORY':
        return action.data
       default:
        return state;
    }
}
