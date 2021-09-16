import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import "@testing-library/jest-dom";

import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

describe("Pruebas con las acciones de Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("login y logout deben de crer la accion respectiva", () => {
    const user = {
      uid: "1234abc",
      displayName: "Roberto",
    };
    const loginAction = login(user.uid, user.displayName);
    const logoutAction = logout();
    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String),
        displayName: expect.any(String),
      },
    });

    expect(logoutAction).toEqual({ type: types.logout });
  });
  test("debe de realizar el startLogout", async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("debe iniciar el startLoginWithEmailAndPAssword", async () => {
    await store.dispatch(startLoginEmailPassword("test@test.com", "123456"));

    const actions = store.getActions();
    console.log(actions);

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "JNRKn32g3wPTnLUbfLf9awc0QkS2",
        displayName: null,
      },
    });
  });
});
