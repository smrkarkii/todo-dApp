import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import "./App.css";

import { TodoContractAddress } from "./config.js";
import { ethers } from "ethers";
import TodoAbi from "./utils/TodoContract.json";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install metamask");
      return;
    } else {
      let chainId = await ethereum.request({ method: "eth_chainId" });
      const goerliChainId = "0x5";

      if (chainId != goerliChainId) {
        alert("not goerli network");
        return;
      } else {
        setCorrectNetwork(true);
        console.log("true goerli");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log(accounts[0]);
    }
  };

  const addTodo = async () => {
    let todo = {
      todotext: input,
    };

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TodoContract = new ethers.Contract(
          TodoContractAddress,
          TodoAbi.abi,
          signer
        );
        TodoContract.addTask(todo.todotext)
          .then((response) => {
            setTodo([...todo, todo]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }

    setInput("");
  };
  const deleteTodo = async () => {};
  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <div>
      <h1>Todo App</h1>
      <div className="connectDiv">
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
      <input className="inputPlace" placeholder="Write your todos" />
      <button className="addButton" onClick={addTodo}>
        Add Todo
      </button>
      <div className="todoList">
        <h4>Todos</h4>
      </div>
    </div>
  );
}

export default App;
