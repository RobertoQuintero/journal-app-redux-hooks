import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import LoginScreen from "../../../components/auth/LoginScreen";
import { MemoryRouter } from "react-router";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

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
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);
describe("Pruebas en <LoginScreen />", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  test("Debe de mostrar el componente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe disparar la accion de GoogleLogin", () => {
    wrapper.find(".google-btn").prop("onClick")();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("debe disparar el startLogin con los respectivos argumeentos", () => {
    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });

    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      "abc@abc.com",
      "123456"
    );
  });
});
