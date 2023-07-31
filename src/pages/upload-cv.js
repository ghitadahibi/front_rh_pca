import { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useQuery } from "react-query";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import "primeflex/primeflex.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import apiClient from "../context/http-common";

// import "../App.css";

const items = [
  {
    label: "File",
    icon: "pi pi-fw pi-file",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-plus",
        items: [
          {
            label: "Bookmark",
            icon: "pi pi-fw pi-bookmark",
          },
          {
            label: "Video",
            icon: "pi pi-fw pi-video",
          },
        ],
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
      },
      {
        separator: true,
      },
      {
        label: "Export",
        icon: "pi pi-fw pi-external-link",
      },
    ],
  },
  {
    label: "Edit",
    icon: "pi pi-fw pi-pencil",
    items: [
      {
        label: "Left",
        icon: "pi pi-fw pi-align-left",
      },
      {
        label: "Right",
        icon: "pi pi-fw pi-align-right",
      },
      {
        label: "Center",
        icon: "pi pi-fw pi-align-center",
      },
      {
        label: "Justify",
        icon: "pi pi-fw pi-align-justify",
      },
    ],
  },
  {
    label: "Users",
    icon: "pi pi-fw pi-user",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-user-plus",
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-user-minus",
      },
      {
        label: "Search",
        icon: "pi pi-fw pi-users",
        items: [
          {
            label: "Filter",
            icon: "pi pi-fw pi-filter",
            items: [
              {
                label: "Print",
                icon: "pi pi-fw pi-print",
              },
            ],
          },
          {
            icon: "pi pi-fw pi-bars",
            label: "List",
          },
        ],
      },
    ],
  },
  {
    label: "Events",
    icon: "pi pi-fw pi-calendar",
    items: [
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Save",
            icon: "pi pi-fw pi-calendar-plus",
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-calendar-minus",
          },
        ],
      },
      {
        label: "Archive",
        icon: "pi pi-fw pi-calendar-times",
        items: [
          {
            label: "Remove",
            icon: "pi pi-fw pi-calendar-minus",
          },
        ],
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: "Quit",
    icon: "pi pi-fw pi-power-off",
  },
];

function UploadCV() {
  const [showMenu, setShowMenu] = useState(false);

  const toast = useRef(null);
  //const router = useRouter();
  const items = [
    {
      label: "Dashboards",
      items: [
        {
          label: "List",
          icon: "pi pi-list",
          command: () => {},
        },
        {
          label: "Delete",
          icon: "pi pi-times",
          command: () => {
            toast.current.show({
              severity: "warn",
              summary: "Delete",
              detail: "Data Deleted",
              life: 3000,
            });
          },
        },
      ],
    },
  ];

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  const { isLoading: isLoadingTutorials, refetch: getAllTutorials } = useQuery(
    "query-tutorials",
    async () => {
      return await apiClient.get("/cv-retreiver/");
    },
    {
      enabled: false,
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
      },
      onError: (err) => {},
    }
  );

  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  return (
    <div className="Upload-cv-main">
      {showMenu ? <Menu model={items} /> : null}
      <div>
        <header className="App-header">
          <div>
            <i
              className="pi pi-bars"
              style={{ color: "slateblue" }}
              onClick={() => setShowMenu(!showMenu)}
            ></i>
          </div>
          <div>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText placeholder="Search" />
            </span>
            <Avatar
              icon="pi pi-user"
              style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
              shape="circle"
            />
          </div>
        </header>
        <div>
          <Card>
            <Toast ref={toast}></Toast>
            <FileUpload
              mode="basic"
              name="demo[]"
              url="cv-reader/"
              maxFileSize={1000000}
              onUpload={onUpload}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UploadCV;
