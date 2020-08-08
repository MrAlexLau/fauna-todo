import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

const ITEMS_QUERY = gql`
  {
    allItems {
      data {
        _id
        name
        isComplete
      }
    }
  }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      _id
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $isComplete: Boolean!) {
    updateItem(id: $id, data: { isComplete: $isComplete }) {
      _id
      isComplete
    }
  }
`;

export function ItemList() {
  const { data, loading } = useQuery(ITEMS_QUERY);

  const [deleteItem, { loading: deleteLoading }] = useMutation(DELETE_ITEM, {
    refetchQueries: [{ query: ITEMS_QUERY }],
  });

  const [updateItem, { loading: updateLoading }] = useMutation(UPDATE_ITEM);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.allItems.data.map((item) => {
        const labelStyles = item.isComplete
          ? { style: { textDecoration: "line-through" } }
          : {};
        return (
          <li key={item._id}>
            <span {...labelStyles}>{item.name}</span>
            <button
              disabled={deleteLoading || updateLoading}
              style={{ marginLeft: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                updateItem({
                  variables: { id: item._id, isComplete: !item.isComplete },
                });
              }}
            >
              {item.isComplete ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button
              disabled={deleteLoading || updateLoading}
              style={{ marginLeft: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                deleteItem({ variables: { id: item._id } });
              }}
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
}
