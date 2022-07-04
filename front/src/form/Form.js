import "./form.css";
import { useState } from "react";

export default function Form({
  base,
  setBase,
  access,
  setAccess,
  name,
  setName,
  show,
  setShow,
  top,
  setTop,
}) {
  let [text, setText] = useState("");
  let [errForm, setErrForm] = useState("");

  let out;
  if (show) {
    out = (
      <div className="form">
        <fieldset>
          <legend>Добавление записи</legend>
          <div>
            <textarea
              placeholder="введтите отзыв"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button onClick={addNote}>добавить зарись</button>
          </div>
        </fieldset>
        <div>
          <button onClick={handlerOut}>выход</button>
        </div>
      </div>
    );
  } else {
    out = (
      <div className="form">
        <fieldset>
          <legend>Добавление раздела</legend>
          <div>
            <input
              type="text"
              value={top}
              onChange={(e) => setTop(e.target.value)}
              placeholder="введтите название торика"
            />
          </div>
          <div>{errForm}</div>
          <div>
            <input type="button" value="add top" onClick={addTop} />
          </div>
          <div>
            <button onClick={handlerOut}>выход</button>
          </div>
        </fieldset>
      </div>
    );
  }

  function addTop() {
    fetch("/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        top: top,
        name: name,
        note: "создан новый раздел",
      }),
    })
      .then((res) => (res = res.json()))
      .then((res) => {
        if (res === "это поле должно быть заполнено") {
          setErrForm("это поле должно быть заполнено");
        } else if (res === "такой раздел уже существует") {
          setErrForm("такой раздел уже существует");
        } else {
          setBase(res);
          setTop("");
        }
      });
  }
  function addNote() {
    if (text !== "") {
      fetch("/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          top: top,
          name: name,
          note: text,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setBase(res);
          setText("");
        });
    } else {
      setErrForm("это поле должно быть заполнено");
    }
  }

  function handlerOut() {
    setAccess(false);
    setTop("");
    setShow(false);
  }

  return out;
}
