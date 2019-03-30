//Reducer
export default function render(state = {}, action) {
  switch (action.tyoe) {
    case 'MENU_RENDER_COMPONENT':
      return {
        ...state,
        renderComponent: action.component,
      }
    default:
      return state;
  }
}