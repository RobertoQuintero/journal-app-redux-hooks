import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  const user = {
    uid: "fGzrdW366XhGZWgiKJUVdwF0E0D2",
    name: "Roberto Quintero",
  };

  test("debe retornar el usuario", () => {
    const initState = {};
    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Roberto",
      },
    };

    const state = authReducer(initState, action);
    console.log(state);
    expect(state).toEqual({
      uid: "abc",
      name: "Roberto",
    });
  });

  test("debe realizar el logout", () => {
    const action = {
      type: types.logout,
    };

    const state = authReducer(user, action);
    expect(state).toEqual({});
  });

  test("debe retornar el initState por default", () => {
    const action = {
      type: "oiuoiuoui",
    };

    const state = authReducer(user, action);
    expect(state).toEqual(user);
  });
});
