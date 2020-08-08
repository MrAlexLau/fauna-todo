import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { AddItem } from "./AddItem";
import { ItemList } from "./ItemList";

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ padding: "5px" }}>
        <h3>My Todo Items</h3>
        <AddItem />
        <ItemList />
      </div>
    </ApolloProvider>
  );
}

export default App;
