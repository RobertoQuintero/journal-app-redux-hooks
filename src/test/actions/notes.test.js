/** * @jest-environment node */
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: { uid: "TESTING" },
  notes: {
    active: {
      id: "bCek37iI0U0Ny3eH8j9I",
      title: "hola",
      body: "mundo",
    },
  },
};

let store = mockStore(initState);

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    return Promise.resolve("Cualquierlinlk/cualquierimagen.jpg");
  }),
}));

describe("Pruebas en la acciones de notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("debe crear una nueva nota startNewNote", async () => {
    const newNote = await store.dispatch(startNewNote());
    const actions = store.getActions();
    console.log(store.getState(), "state");
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    const uid = store.getState().auth.uid;
    await deleteDoc(doc(db, `${uid}/journal/notes/${newNote}`));
  });

  test("startloadingNotes debe cargar las notas", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("StartSaveNote debe de actualizar la nota", async () => {
    const note = {
      id: "Zjcp33iED277Lo7qU5uD",
      title: "titulo",
      body: "body",
    };
    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();
    expect(actions[0].type).toBe(types.notesUpdated);
    const docRef = doc(db, `/TESTING/journal/notes/${note.id}`);
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().title).toBe(note.title);
  });

  test("startUploading debe de actualizar el url del entry", async () => {
    const note = {
      id: "bCek37iI0U0Ny3eH8j9I",
      url: "Cualquierlinlk/cualquierimagen.jpg",
    };
    const file = [];
    await store.dispatch(startUploading(file));

    const docRef = doc(db, `/TESTING/journal/notes/${note.id}`);
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().url).toBe(note.url);
  });
});
