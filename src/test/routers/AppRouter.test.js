import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { login } from "../../actions/auth";
import LoginScreen from "../../components/auth/LoginScreen";
import { MemoryRouter } from "react-router";
import AppRouter from "../../routers/AppRouter";
import { act } from "react-dom/test-utils";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msg: null,
  },
  notes: {
    active: {
      id: "abc",
    },
    notes: [],
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

describe("Prueba en <AppRouter />", () => {
  test("debe llamar el login si estoy autenticado", async () => {
    let user;
    await act(async () => {
      const userCred = await signInWithEmailAndPassword(
        getAuth(),
        "test@test.com",
        "123456"
      );
      user = userCred;
      console.log(userCred);

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(login).toHaveBeenCalled();
  });
});
