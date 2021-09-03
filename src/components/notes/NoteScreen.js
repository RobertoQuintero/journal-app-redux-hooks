import React from "react";
import NotesAppbar from "./NotesAppbar";

const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppbar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
        ></textarea>

        <div className="notes__image">
          <img
            src="https://static01.nyt.com/images/2021/06/16/well/well-sunrise/well-sunrise-mediumSquareAt3X.jpg"
            alt="imagen"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteScreen;
