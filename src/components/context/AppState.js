import React, { useCallback, useState } from "react";
import appContext from "./Createcontext";

const AppState = (props) => {
  const [state, setState] = useState({
    isMenuOpen: false,
    activeCustomerCreateModal: false,
    activeProductCreateModal: false,
    activeCustomerEditModal: false,
    activeProductEditModal: false,
    activeProductDeleteModal: false,
    activeCustomerDeleteModal: false
  });

  const toggleMenu = useCallback(() => {
    setState((prevState) => ({ ...prevState, isMenuOpen: !prevState.isMenuOpen }));
  }, []);

  const handleToggle = useCallback((key) => {
    setState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  }, []);

  const value = {
    ...state,
    toggleMenu,
    handleChangeCustomerCreateModal: () => handleToggle('activeCustomerCreateModal'),
    handleChangeProductCreateModal: () => handleToggle('activeProductCreateModal'),
    handleChangeCustomerEditModal: () => handleToggle('activeCustomerEditModal'),
    handleChangeCustomerDeleteModal: () => handleToggle('activeCustomerDeleteModal'),
    handleChangeProductEditModal: () => handleToggle('activeProductEditModal'),
    handleChangeProductDeleteModal: () => handleToggle('activeProductDeleteModal')
  };

  return (
    <appContext.Provider value={value}>
      {props.children}
    </appContext.Provider>
  );
};

export default AppState;
