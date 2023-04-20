import { Navigation } from "@shopify/polaris";
import { HomeMinor, ProductsMinor, CustomersMajor } from "@shopify/polaris-icons";
import { useState } from "react";
import LogoutButton from "../button/LogoutButton";

const navigationItems = [
  {
    label: "Home",
    url: "",
    icon: HomeMinor,
  },
  {
    label: "Products",
    url: "/products",
    icon: ProductsMinor,
  },
  {
    label: "Customers",
    url: "/customers",
    icon: CustomersMajor,
  },
  {
    label: "Orders",
    url: "/orders",
    icon: ProductsMinor,
  }
];

const SideNavMarkup = () => {
  const [selectedNavbar, setSelectedNavbar] = useState("");

  const handleNavbarClick = (url) => {
    setSelectedNavbar(url);
  };

  const navItems = navigationItems.map(({ label, url, icon }) => (
    <Navigation.Item
      key={label}
      label={label}
      url={url}
      icon={icon}
      selected={selectedNavbar === url}
      onClick={() => handleNavbarClick(url)}
    />
  ));

  return (
    <Navigation location="/">
      {navItems}
      <LogoutButton />
    </Navigation>
  );
};

export default SideNavMarkup;
