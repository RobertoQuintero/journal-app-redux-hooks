import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import RegisterScreen from "../../../components/auth/RegisterScreen";
import "@testing-library/jest-dom";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msg: null,
  },
};

let store = mockStore(initState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <RegisterScreen />", () => {
  test("debe mostrar el componente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe hacer el dispatch de la acción respectiva", () => {
    const emailField = wrapper.find("input[name='email']");

    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    const actions = store.getActions();
    console.log(actions);
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: "Name is required",
    });
  });

  test("debe mostrar la caja de alerta", () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "Email no es correcto",
      },
    };

    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
      initState.ui.msgError
    );
  });
});
