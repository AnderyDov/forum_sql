import "./list.css";

export default function List({ base, setBase, show, setShow, top, setTop }) {
  let out;
  let arr = [...base].map((item) => item.top);
  let set = new Set(arr);

  if (!show) {
    out = [...set].map((item, index) => (
      <li key={index} onClick={() => handlerClick(item)}>
        {item}
      </li>
    ));
    out = (
      <div className="list">
        <ul>{out}</ul>
      </div>
    );
  } else {
    out = [...base].map((item) => {
      if (item.top === top) {
        return (
          <li>
            <p className="name">
              <span>{item.name}</span>
              <span>{item.date}</span>
            </p>
            <div className="text">{item.note}</div>
            <hr />
          </li>
        );
      }
    });
    out = (
      <div className="list">
        <div>
          <button onClick={handlerBack}>назад</button>
        </div>
        <ul>{out}</ul>
      </div>
    );
  }

  function handlerClick(top) {
    setTop(top);
    setShow(!show);
  }

  function handlerBack() {
    setTop("");
    setShow(false);
  }

  return out;
}
