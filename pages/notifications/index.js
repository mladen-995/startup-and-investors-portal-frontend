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
import RequestDeleteButton from "../../components/request-delete-button.js";
import NotificationDetailsModal from "../../components/notifications/details-modal";

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
            loadNotifications();
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
            loadNotifications();
          }}
        />
      );
    }
  };

  function renderRequestDeleteButton(row) {
    if (
      !row.requestedDeletion &&
      user?.user?.id === row.createdBy &&
      !user?.isAdministrator()
    ) {
      return (
        <RequestDeleteButton
          itemId={row.id}
          itemTitle={row.title}
          requestDeleteUrlPath="notifications"
          onDeleteRequest={() => {
            NotificationManager.success("Delete request is successfully sent.");
            loadNotifications();
          }}
        />
      );
    }
  }

  function renderArchiveButton(row) {
    if (!row.isArchived && user?.user?.id === row.createdBy) {
      return (
        <ArchiveButton
          itemId={row.id}
          itemTitle={row.title}
          archiveUrlPath="notifications"
          onArchive={() => {
            NotificationManager.success(
              "Notification is successfully archived."
            );
            loadNotifications();
          }}
        />
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
      minWidth: "300px",
      cell: (row) => (
        <div>
          <NotificationDetailsModal notificationId={row.id} />
          {renderArchiveButton(row)}
          {renderRequestDeleteButton(row)}
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
