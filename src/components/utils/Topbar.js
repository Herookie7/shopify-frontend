import { Avatar, TopBar } from "@shopify/polaris";
import { useContext } from "react";
import appContext from "../context/Createcontext";

const TopBarMarkup = () => {
  const { toggleMenu } = useContext(appContext);

  const userMenuActions = [{ content: "Sign out" }];

  return (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMenu}
      userMenu={
        <TopBar.UserMenu
          actions={[{ items: userMenuActions }]}
          name="Anoop Sunarthy"
          detail="herookie@tensi.org"
          initials="AS"
          avatar={<Avatar customer size="medium" />}
        />
      }
    />
  );
};

export default TopBarMarkup;
