import React, { useState } from "react";
import {
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
} from "@shopify/polaris";
const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadingMarkup = (
    <SkeletonPage primaryAction secondaryActions={2}>
      <div className="Polaris-TextContainer">
        <SkeletonDisplayText size="large">asfdafsd</SkeletonDisplayText>
        <SkeletonBodyText></SkeletonBodyText>
      </div>
    </SkeletonPage>
  );
  return (
    <div style={{ height: "500px" }}>
      Dashboard
    </div>
  );
};

export default AdminDashboard;
