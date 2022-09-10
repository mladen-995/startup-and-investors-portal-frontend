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

export default function Groups() {
  const user = useUser();
  const [groups, setGroups] = useState([]);

  const loadGroups = async () => {
    const {
      data: { data },
    } = await axiosInstance.get("startup-groups");

    setGroups(data);
  };

  useEffect(() => {
    loadGroups();
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

  const renderDeleteButton = (row) => {
    if (user?.isAdministrator()) {
      return (
        <DeleteButton
          itemId={row.id}
          itemTitle={row.title}
          deleteUrlPath="startup-groups"
          onDelete={() => {
            NotificationManager.success("Group is successfully deleted.");
            loadGroups();
          }}
        />
      );
    }
  };

  function renderArchiveButton(row) {
    if (!row.isArchived) {
      return (
        <Button
          variant="warning"
          className="me-2"
          size="sm"
          onClick={() => archive(row.id)}
        >
          Archive
        </Button>
      );
    }
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
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
          {renderDeleteButton(row)}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Groups</h1>
      <hr />
      <Link href="/groups/create">
        <Button variant="primary" type="submit">
          Create group
        </Button>
      </Link>
      <DataTable columns={columns} data={groups} />
      <NotificationContainer />
    </div>
  );
}

Groups.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
