import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import Sidebar from "../../../components/journal/Sidebar";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: "1",
    name: "Roberto",
  },
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

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe("Pruebas en <Sidebar />", () => {
  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe llamar el startLogout", () => {
    wrapper.find(".btn").prop("onClick")();
    expect(startLogout).toHaveBeenCalled();
  });

  test("debe llamar el startNewNote", () => {
    wrapper.find(".journal__new-entry").prop("onClick")();
    expect(startNewNote).toHaveBeenCalled();
  });
});
