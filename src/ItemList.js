import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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

export function ItemList() {
  const { data, loading } = useQuery(ITEMS_QUERY);

  if (loading) {
    return "Loading...";
  }

  return (
    <ul>
      {data.allItems.data.map((item) => {
        return <li key={item._id}>{item.name}</li>;
      })}
    </ul>
  );
}
