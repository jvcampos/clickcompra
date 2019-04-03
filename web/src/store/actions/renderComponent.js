//Action
import { push } from "connected-react-router";

export default function renderComponent(component) {
  return (dispatch) => {
    dispatch(push(`/${component}`))
    dispatch(renderSuccess(component))
  }
}

export const renderSuccess = (component) => {
  return {
    type: 'MENU_RENDER_COMPONENT',
    component,
  }
}