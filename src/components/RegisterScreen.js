import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";

function RegisterScreen() {
  const [listdata, setListdata] = useState([]);
  const [interestList, setInterestList] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const orderCardRef = useRef(null);

  const populateInterests = async (value) => {
    const res = await fetch(
      `${process.env.REACT_APP_RAPID_API_GET_URL}?q=${value}&language=en`,
      {
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_RAPID_API_GET_HOST,
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_GET_KEY,
        },
      }
    );
    const res2 = await res.json();
    if (res2 && res2.data && res2.data.results) {
      setListdata(res2.data.results);
    }
  };

  const addInterestHandler = (value) => {
    if (value && interestList.length < 3) {
      let uniqueArray = [...new Set([...interestList, value])];
      setInterestList(uniqueArray);
      M.toast({ html: "interest added to list", classes: "green" });
    }
    if (interestList.length === 3) {
      M.toast({ html: "you can only add upto 3 interests", classes: "red" });
    }
  };

  const deleteInterestHandler = (item) => {
    let uniqueArray = new Set(interestList);
    uniqueArray.delete(item);
    setInterestList([...uniqueArray]);
    M.toast({ html: "interest removed", classes: "red" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name && email && interestList.length > 0 && interestList.length <= 3) {
      const res = await axios.post(
        process.env.REACT_APP_RAPID_API_POST_URL,
        { name, email, interests: interestList.join(", ") },
        {
          headers: {
            accept: " success",
            "content-type": " application/x-www-form-urlencoded",
            "x-rapidapi-host": process.env.REACT_APP_RAPID_API_POST_HOST,
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_POST_KEY,
          },
        }
      );
      // console.log(res);
      if (res.statusText === "OK") {
        // console.log("ok");
        M.toast({ html: "registration successful", classes: "green" });
      }
    }
    if (!name) {
      M.toast({ html: "Name cannot be empty", classes: "red" });
    }
    if (!email) {
      M.toast({ html: "email cannot be empty", classes: "red" });
    }
    if (interestList.length === 0) {
      M.toast({ html: "select atleast one interest", classes: "red" });
    }
  };

  useEffect(() => {
    M.Collapsible.init(orderCardRef.current);
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <div className="input-field col s12">
        <i className="material-icons prefix">account_circle</i>
        <label htmlFor="name" className="autocomplete">
          Name
        </label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-field col s12">
        <i className="material-icons prefix">email</i>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div>
          {interestList.map((item, index) => (
            <button
              key={index}
              onClick={() => deleteInterestHandler(item)}
              className="waves-effect waves-light btn"
              style={{ margin: "3px" }}
            >
              {item}
              <i className="material-icons right">delete</i>
            </button>
          ))}
        </div>
      </div>
      <div className="input-field col s12">
        <i className="material-icons prefix">lightbulb</i>
        <label htmlFor="addinterest">Add Interests</label>
        <input
          list="interest"
          type="text"
          id="addinterest"
          onChange={(e) => populateInterests(e.target.value)}
        />
        {listdata.length > 0 && (
          <ul id="interest" className="list-1" ref={orderCardRef}>
            {listdata.map((data, index) => (
              <li
                key={index}
                value={data}
                onClick={() => addInterestHandler(data)}
                className="waves-effect waves-light btn green"
                style={{ margin: "3px" }}
              >
                {data}
                <i className="material-icons right">add</i>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="waves-effect waves-light btn red">
        Register<i className="material-icons right">cloud</i>
      </button>
    </form>
  );
}

export default RegisterScreen;
