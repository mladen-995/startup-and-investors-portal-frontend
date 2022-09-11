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
import DeleteButton from "../../components/delete-button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import DeclineDeleteRequestButton from "../../components/decline-delete-request-button";

export default function Notifications() {
  const user = useUser();
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    const {
      data: { data },
    } = await axiosInstance.get("notifications");
    setNotifications(data);
  };

  useEffect(() => {
    loadNotifications();
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

  const renderDeclineDeleteRequestButton = (row) => {
    if (row.requestedDeletion && user?.isAdministrator()) {
      return (
        <DeclineDeleteRequestButton
          itemId={row.id}
          itemTitle={row.title}
          declineUrlPath="notifications/decline-delete-request"
          onDecline={() => {
            NotificationManager.success(
              "Delete request is successfully declined."
            );
            notifications();
          }}
        />
      );
    }
  };

  const renderDeleteButton = (row) => {
    if (user?.isAdministrator()) {
      return (
        <DeleteButton
          itemId={row.id}
          itemTitle={row.title}
          deleteUrlPath="notifications"
          onDelete={() => {
            NotificationManager.success(
              "Notification is successfully deleted."
            );
            loadAds();
          }}
        />
      );
    }
  };

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
      cell: (row) => (
        <div>
          {renderArchiveButton(row)}
          {renderDeclineDeleteRequestButton(row)}
          {renderDeleteButton(row)}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Notifications</h1>
      <hr />

      {user && user.isLoggedIn && (
        <Link href="/notifications/create">
          <Button variant="primary" type="submit">
            Create notification
          </Button>
        </Link>
      )}

      <DataTable columns={columns} data={notifications} />
      <NotificationContainer />
    </div>
  );
}

Notifications.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
