import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AuthLayout from "../../components/layout-auth";
import { Badge, Button, Dropdown } from "react-bootstrap";
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
import AdDetailsModal from "../../components/ads/details-modal";

export default function Ads() {
  const user = useUser();
  const [ads, setAds] = useState([]);

  const loadAds = async () => {
    const {
      data: { data },
    } = await axiosInstance.get("ads");
    setAds(data);
  };

  useEffect(() => {
    loadAds();
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
          declineUrlPath="ads/decline-delete-request"
          onDecline={() => {
            NotificationManager.success(
              "Delete request is successfully declined."
            );
            loadAds();
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
          deleteUrlPath="ads"
          onDelete={() => {
            NotificationManager.success("Ad is successfully deleted.");
            loadAds();
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
          requestDeleteUrlPath="ads"
          onDeleteRequest={() => {
            NotificationManager.success("Delete request is successfully sent.");
            loadAds();
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
          archiveUrlPath="ads"
          onArchive={() => {
            NotificationManager.success("Ad is successfully archived.");
            loadAds();
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
          <AdDetailsModal adId={row.id} />
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
      <h1>Ads</h1>
      <hr />

      {user && user.isLoggedIn && (
        <Link href="/ads/create">
          <Button variant="primary" type="submit">
            Create ads
          </Button>
        </Link>
      )}

      <DataTable columns={columns} data={ads} />
      <NotificationContainer />
    </div>
  );
}

Ads.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
