import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: Icons.HomeIcon,
        items: [],
      },
      // {
      //   title: "Dashboard",
      //   icon: Icons.HomeIcon,
      //   items: [
      //     {
      //       title: "eCommerce",
      //       url: "/",
      //     },
      //   ],
      // },
      {
        title: "App Key",
        url: "/app-key",
        icon: Icons.SecretKeyIcon,
        items: [],
      },
      {
        title: "Packages",
        url: "/package",
        icon: Icons.PackageBoxIcon,
        items: [],
      },
      {
        title: "Billing",
        url: "/billing",
        icon: Icons.BillingIcon,
        items: [],
      },
      // {
      //   title: "Forms",
      //   icon: Icons.Alphabet,
      //   items: [
      //     {
      //       title: "Form Elements",
      //       url: "/forms/form-elements",
      //     },
      //     {
      //       title: "Form Layout",
      //       url: "/forms/form-layout",
      //     },
      //   ],
      // },
      // {
      //   title: "Tables",
      //   url: "/tables",
      //   icon: Icons.Table,
      //   items: [
      //     {
      //       title: "Tables",
      //       url: "/tables",
      //     },
      //   ],
      // },
      // {
      //   title: "Pages",
      //   icon: Icons.Alphabet,
      //   items: [
      //     {
      //       title: "Settings",
      //       url: "/pages/settings",
      //     },
      //   ],
      // },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/sign-in",
          },
        ],
      },
    ],
  },
];
