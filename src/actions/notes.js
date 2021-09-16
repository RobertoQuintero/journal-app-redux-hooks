import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const note = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    try {
      const doc = await addDoc(collection(db, `${uid}/journal/notes`), note);
      dispatch(activeNote(doc.id, note));
      dispatch(addNewNote(doc.id, note));
      return doc.id;
    } catch (error) {
      console.log(error);
    }
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.url) {
      delete note.url;
    }
    const noteToFiestore = { ...note };
    delete noteToFiestore.id;
    const docPath = doc(db, `${uid}/journal/notes/${note.id}`);
    await updateDoc(docPath, noteToFiestore);
    dispatch(refreshNote(note.id, noteToFiestore));
    Swal.fire("Guardado", note.title, "Guardado exitosamente!");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, ...note } },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: "Uploading...",
      text: "Please wait",
      allowOutsideClick: false,
      willOpen: () => Swal.showLoading(),
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));
    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const notesLogout = () => ({
  type: types.notesLogoutCleaning,
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});
