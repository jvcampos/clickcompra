//Reducer
export default function render(state = {}, action) {
  switch(action.type) {
    case 'MENU_RENDER_COMPONENT':
      return {
        ...state,
        componentSelected: action.component,
      }
    default:
      return state;
  }
}