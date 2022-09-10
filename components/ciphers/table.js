import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { axiosInstance } from "../../lib/axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import DeleteButton from "../delete-button";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function CipherTable({ fetchUrlPath, deleteUrlPath }) {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const {
      data: { data },
    } = await axiosInstance.get(`${fetchUrlPath}`);
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const renderDeleteButton = (row) => {
    return (
      <DeleteButton
        itemId={row.id}
        itemTitle={row.name}
        deleteUrlPath={deleteUrlPath}
        onDelete={() => {
          NotificationManager.success("Item is successfully deleted.");
          loadItems();
        }}
      />
    );
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <div>{renderDeleteButton(row)}</div>,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={items} />
      <NotificationContainer />
    </>
  );
}
