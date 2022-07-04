import "./App.css";
import FormLog from "./formLog/FormLog";
import Form from "./form/Form";
import List from "./list/List";
import { useState, useEffect } from "react";

export default function App() {
  let [base, setBase] = useState([]);
  let [name, setName] = useState("");
  let [access, setAccess] = useState(false);
  let [show, setShow] = useState(false);
  let [top, setTop] = useState("");

  useEffect(() => {
    fetch("/base")
      .then((res) => (res = res.json()))
      .then((res) => {
        setBase(res);
        console.log("render");
      });
  }, []);

  let forms;

  if (access) {
    forms = (
      <Form
        base={base}
        setBase={setBase}
        access={access}
        setAccess={setAccess}
        name={name}
        setName={setName}
        show={show}
        setShow={setShow}
        top={top}
        setTop={setTop}
      />
    );
  } else {
    forms = (
      <FormLog
        name={name}
        setName={setName}
        access={access}
        setAccess={setAccess}
      />
    );
  }

  let out = (
    <>
      <h2 className="head">Forum</h2>
      <div className="App">
        {forms}
        <List
          base={base}
          setBase={setBase}
          show={show}
          setShow={setShow}
          top={top}
          setTop={setTop}
        />
      </div>
    </>
  );

  return out;
}
