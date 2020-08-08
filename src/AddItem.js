import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_ITEM = gql`
  mutation CreateItem($data: ItemInput!) {
    createItem(data: $data) {
      _id
    }
  }
`;

const ITEMS_QUERY = gql`
  {
    allItems {
      data {
        _id
        name
      }
    }
  }
`;

export function AddItem() {
  const [showForm, setShowForm] = React.useState(false);
  const [newItemName, setNewItemName] = React.useState("");

  const [createItem, { loading }] = useMutation(CREATE_ITEM, {
    refetchQueries: [{ query: ITEMS_QUERY }],
    onCompleted: () => {
      setNewItemName("");
      setShowForm(false);
    },
  });

  if (showForm) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createItem({ variables: { data: { name: newItemName } } });
        }}
      >
        <label>
          <input
            disabled={loading}
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            style={{ marginRight: "5px" }}
          />
        </label>
        <input disabled={loading} type="submit" value="Add" />
      </form>
    );
  }

  return <button onClick={() => setShowForm(true)}>Add Item</button>;
}
