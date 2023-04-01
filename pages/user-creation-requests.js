import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AuthLayout from "../components/layout-auth";
import { Badge, Button } from "react-bootstrap";
import Link from "next/link";
import { axiosInstance } from "../lib/axios";
import { useUser } from "../hooks/user-hook";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import DeleteButton from "../components/delete-button";
import DeclineDeleteRequestButton from "../components/decline-delete-request-button";
import ArchiveButton from "../components/archive-button";
import RequestDeleteButton from "../components/request-delete-button.js";
import { formatDateTime } from "../lib/format-date";
import NewsDetails from "../components/news/details-button";

export default function UserCreationRequests() {
  const user = useUser();
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const {
      data: { data },
    } = await axiosInstance.get("user-creation-requests");
    setItems(data);
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    loadItems();
  }, [user]);

  const onApprove = async (row) => {
    await axiosInstance.post(`user-creation-requests/approve/${row.id}`);
    NotificationManager.success("User request is successfully approved.");
    loadItems();
  };

  const onReject = async (row) => {
    await axiosInstance.post(`user-creation-requests/reject/${row.id}`);
    NotificationManager.success("User request is successfully rejected.");
    loadItems();
  };

  const columns = [
    {
      name: "Name",
      selector: (row) =>
        `${row.user.firstName} ${row.user.middleName} ${row.user.lastName}`,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => {
        if (row.user?.investorProfile) {
          return "Investor";
        } else {
          return "Startup";
        }
      },
      sortable: true,
    },
    {
      name: "Created at",
      selector: (row) => row.createdAt,
      cell: (row) => formatDateTime(row.createdAt),
    },
    {
      name: "Actions",
      minWidth: "300px",
      cell: (row) => (
        <div>
          <Button variant="info" size="sm" className="me-2">
            Show
          </Button>
          <Button
            variant="success"
            size="sm"
            className="me-2"
            onClick={() => {
              onApprove(row);
            }}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="me-2"
            onClick={() => {
              onReject(row);
            }}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>User creation requests</h1>
      <hr />

      <DataTable columns={columns} data={items} />
      <NotificationContainer />
    </div>
  );
}

UserCreationRequests.getLayout = function getLayout(page) {
  return (
    <AuthLayout isProtected={true} isAdmin={true}>
      {page}
    </AuthLayout>
  );
};
