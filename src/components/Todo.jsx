import React, { useState, useEffect } from "react";
import "./Todo.css";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";

function Todo() {
  const [todos, setTodos] = useState([]);

  const [text, setText] = useState("");

  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    //Firestoreからデータを取得
    const col = await getDocs(collection(db, "todos"));
    // console.log(col.docs);
    // console.log(col.docs[0].id)
    const todoList = col.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), //{}を一つにしたいから展開しているイメージ
    }));
    // console.log(col.docs)
    // console.log(col.docs[0].data()). //０番目の中身を取り出す
    // console.log(todoList);
    setTodos(todoList); //reactのstate更新
  };

  const handleClick = async () => {
    if (text.trim() === "") {
      alert("空文字では入力することはできません");
      return;
    }

    // setTodos([...todos,text]);
    await addDoc(collection(db, "todos"), {
      //Firestoreのtodosフォルダ   //
      text: text,
      completed: false,
    });
    fetchTodos();
    setText("");
    // console.log(todos);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    await fetchTodos(); //
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "todos", editId), {
      text: text,
    });
    setText("");
    setEditId(null); //編集していないことを表している
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <div>
        <h1>Firebseを使ってTodoList</h1>
        <input
          className="input"
          value={text}
          onChange={(event) => handleChange(event)}
          onKeyDown={handleKeyDown}
        ></input>
        {editId ? (
          <button onClick={handleUpdate}>更新</button>
        ) : (
          <button onClick={handleClick}>追加</button>
        )}
        {/* <button onClick={handleLogin}>Googleでログイン</button> */}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo)}
              ></input>
              {todo.text}
              <button onClick={() => handleDelete(todo.id)}>削除</button>
              <button onClick={() => handleEdit(todo)}>編集</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
}

export default Todo;
