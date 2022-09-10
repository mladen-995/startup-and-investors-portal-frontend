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
import DiscussionModal from "../../components/discussions/discussion-modal";
import { useUser } from "../../context/user-hook";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import DeleteButton from "../../components/delete-button";
import DeclineDeleteRequestButton from "../../components/decline-delete-request-button";

export default function Discussions() {
  const user = useUser();
  const [discussions, setDiscussions] = useState([]);

  const loadDiscussions = async () => {
    const {
      data: { data },
    } = await axiosInstance.get("discussions");
    setDiscussions(data);
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    loadDiscussions();
  }, [user]);

  const requestDelete = async (discussionId) => {
    await axiosInstance.post(`discussions/delete-request/${discussionId}`);
    NotificationManager.success("Delete request is successfully sent.");
    loadDiscussions();
  };

  const archive = async (discussionId) => {
    await axiosInstance.post(`discussions/archive/${discussionId}`);
    NotificationManager.success("Discussion is successfully archived.");
    loadDiscussions();
  };

  const renderStatus = (row) => {
    if (row.requestedDeletion) {
      return <Badge bg="danger">Requested deletion</Badge>;
    } else if (row.isArchived) {
      return <Badge bg="warning">Archived</Badge>;
    } else {
      return <Badge bg="success">Active</Badge>;
    }
  };

  const renderDeclineDeleteRequestButton = (row) => {
    if (row.requestedDeletion && user?.isAdministrator()) {
      return (
        <DeclineDeleteRequestButton
          itemId={row.id}
          itemTitle={row.title}
          declineUrlPath="discussions/decline-delete-request"
          onDecline={() => {
            NotificationManager.success(
              "Delete request is successfully declined."
            );
            loadDiscussions();
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
          deleteUrlPath="discussions"
          onDelete={() => {
            NotificationManager.success("Discussion is successfully deleted.");
            loadDiscussions();
          }}
        />
      );
    }
  };

  const renderRequestDeleteButton = (row) => {
    if (!row.requestedDeletion && user.user.id === row.createdBy) {
      return (
        <Button
          variant="danger"
          size="sm"
          className="me-2"
          onClick={() => {
            requestDelete(row.id);
          }}
        >
          Delete
        </Button>
      );
    }
  };

  const renderArchiveButton = (row) => {
    if (!row.isArchived && user.user.id === row.createdBy) {
      return (
        <Button
          variant="warning"
          size="sm"
          className="me-2"
          onClick={() => archive(row.id)}
        >
          Archive
        </Button>
      );
    }
  };

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
      cell: (row) => renderStatus(row),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <DiscussionModal discussionId={row.id} />
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
      <h1>Discussions</h1>
      <hr />

      <Link href="/discussions/create">
        <Button variant="primary" type="submit">
          Create discussion
        </Button>
      </Link>
      <DataTable columns={columns} data={discussions} />
      <NotificationContainer />
    </div>
  );
}

Discussions.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
