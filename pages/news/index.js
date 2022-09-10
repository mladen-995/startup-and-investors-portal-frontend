import { getUser } from "../../services/user.service";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import DataTable from "react-data-table-component";
import AuthLayout from "../../components/layout-auth";
import { sessionOptions } from "../../lib/session";
import { Badge, Button, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { axiosInstance } from "../../lib/axios";
import { useUser } from "../../context/user-hook";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import SweetAlert from "react-bootstrap-sweetalert";
import ResolveDeleteRequest from "../../components/resolve-delete-request";
import DeleteButton from "../../components/delete-button";
import DeclineDeleteRequestButton from "../../components/decline-delete-request-button";

export default function News() {
  const user = useUser();
  const [news, setNews] = useState([]);
  const [resolveDeleteRequestPromptShow, setResolveDeleteRequestPromptShow] =
    useState(false);

  const loadNews = async () => {
    const {
      data: { data },
    } = await axiosInstance.get("news");
    setNews(data);
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    loadNews();
  }, [user]);

  const requestDelete = async (newsId) => {
    await axiosInstance.post(`news/delete-request/${newsId}`);
    NotificationManager.success("Delete request is successfully sent.");
    loadNews();
  };

  const archive = async (newsId) => {
    await axiosInstance.post(`news/archive/${newsId}`);
    NotificationManager.success("News is successfully archived.");
    loadNews();
  };

  const onDeleteRequestResolve = () => {
    loadNews();
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
          declineUrlPath="news/decline-delete-request"
          onDecline={() => {
            NotificationManager.success(
              "Delete request is successfully declined."
            );
            loadNews();
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
          deleteUrlPath="news"
          onDelete={() => {
            NotificationManager.success("News is successfully deleted.");
            loadNews();
          }}
        />
      );
    }
  };

  const renderRequestDeleteButton = (row) => {
    if (
      !row.requestedDeletion &&
      user.user.id === row.createdBy &&
      !user.isAdministrator()
    ) {
      return (
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            requestDelete(row.id);
          }}
        >
          Request delete
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
      <h1>News</h1>
      <hr />

      <Link href="/news/create">
        <Button variant="primary" type="submit">
          Create news
        </Button>
      </Link>
      <DataTable columns={columns} data={news} />
      <NotificationContainer />
    </div>
  );
}

News.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
