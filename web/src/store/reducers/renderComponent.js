//Reducer
export default function render(state = {}, action) {
  switch(action.type) {
    case 'MENU_RENDER_COMPONENT':
    console.log(action)
      return {
        ...state,
        componentSelected: action.component,
      }
    default:
      return state;
  }
}