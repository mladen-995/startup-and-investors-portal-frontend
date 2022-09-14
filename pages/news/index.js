import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AuthLayout from "../../components/layout-auth";
import { Badge, Button } from "react-bootstrap";
import Link from "next/link";
import { axiosInstance } from "../../lib/axios";
import { useUser } from "../../context/user-hook";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import DeleteButton from "../../components/delete-button";
import DeclineDeleteRequestButton from "../../components/decline-delete-request-button";
import ArchiveButton from "../../components/archive-button";
import RequestDeleteButton from "../../components/request-delete-button.js";
import { formatDateTime } from "../../lib/format-date";
import NewsDetails from "../../components/news/details-button";

export default function News() {
  const user = useUser();
  const [news, setNews] = useState([]);

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
      user?.user?.id === row.createdBy &&
      !user?.isAdministrator()
    ) {
      return (
        <RequestDeleteButton
          itemId={row.id}
          itemTitle={row.title}
          requestDeleteUrlPath="news/delete-request"
          onDeleteRequest={() => {
            NotificationManager.success("Delete request is successfully sent.");
            loadNews();
          }}
        />
      );
    }
  };

  const renderArchiveButton = (row) => {
    if (!row.isArchived && user?.user?.id === row.createdBy) {
      return (
        <ArchiveButton
          itemId={row.id}
          itemTitle={row.title}
          archiveUrlPath="news/archive"
          onArchive={() => {
            NotificationManager.success("News is successfully archived.");
            loadNews();
          }}
        />
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
      name: "Created at",
      selector: (row) => row.createdAt,
      cell: (row) => formatDateTime(row.createdAt),
    },
    {
      name: "Status",
      selector: (row) => row.requestedDeletion,
      cell: (row) => renderStatus(row),
    },
    {
      name: "Actions",
      minWidth: "300px",
      cell: (row) => (
        <div>
          <NewsDetails newsId={row.id} />
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

      {user && user.isLoggedIn && (
        <Link href="/news/create">
          <Button variant="primary" type="submit">
            Create news
          </Button>
        </Link>
      )}

      <DataTable columns={columns} data={news} />
      <NotificationContainer />
    </div>
  );
}

News.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
