import { getUser } from "../../services/user.service";
import { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import DataTable from "react-data-table-component";
import AuthLayout from "../../components/layout-auth";
import { sessionOptions } from "../../lib/session";
import { Badge, Button, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { axiosInstance } from "../../lib/axios";
import { useUser } from "../../context/user-hook";

export default function Notifications() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axiosInstance.get("notifications").then((response) => {
      setNews(response.data.data);
    });
  }, []);

  function requestDelete(newsId) {
    axiosInstance.post(`news/delete-request/${newsId}`).then((res) => {
      axiosInstance.get("news").then((response) => {
        setNews(response.data.data);
      });
    });
  }

  function archive(newsId) {
    axiosInstance.post(`news/archive/${newsId}`).then((res) => {
      axiosInstance.get("news").then((response) => {
        setNews(response.data.data);
      });
    });
  }

  function renderRequestDeleteButton(row) {
    if (!row.requestedDeletion) {
      return (
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            requestDelete(row.id);
          }}
        >
          Delete
        </Button>
      );
    }
  }

  function renderArchiveButton(row) {
    if (!row.isArchived) {
      return (
        <Button variant="warning" size="sm" onClick={() => archive(row.id)}>
          Archive
        </Button>
      );
    }
  }

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Visibility",
      selector: (row) => row.visibility,
    },
    {
      name: "Status",
      selector: (row) => row.requestedDeletion,
      cell: (row) => {
        if (row.requestedDeletion) {
          return <Badge bg="danger">Requested deletion</Badge>;
        } else {
          return <Badge bg="success">Active</Badge>;
        }
      },
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
          {renderArchiveButton(row)}
          {renderRequestDeleteButton(row)}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Notifications</h1>
      <hr />
      <Link href="/notifications/create">
        <Button variant="primary" type="submit">
          Create notification
        </Button>
      </Link>
      <DataTable columns={columns} data={news} />
    </div>
  );
}

Notifications.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
