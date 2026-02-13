// src/dip/index.tsx
import React from "react";

import UserList from "./components/UserList";
import MenuList from "./components/MenuList";
import { UserApiService } from "./services/UserApiService";
import { MenuApiService } from "./services/MenuApiService";
import { UserMockService } from "./services/UserMockService";
import { MenuMockService } from "./services/MenuMockService";

import "./styles/index.scss";

// We can easily switch the implementation here without touching the UserList component.
const useLiveApi = true; // Try setting this to false!

const userService = useLiveApi ? new UserApiService() : new UserMockService();
const menuService = useLiveApi ? new MenuApiService() : new MenuMockService();

const DependenceInversionPrincipe: React.FC = () => {
  return (
    <div className="dip-container">
      <h2>Dependency Inversion Principle (DIP) Example</h2>
      <p>
        The <code>UserList</code> component below depends on a{" "}
        <code>UserService</code> abstraction, not a concrete implementation. We
        are currently injecting
        <code>{useLiveApi ? "UserApiService" : "UserMockService"}</code>.
      </p>
      <UserList userService={userService} />

      <div style={{ marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
        <h3>Menu Component (DIP)</h3>
        <p>
          This <code>MenuList</code> component also follows DIP by depending on{" "}
          <code>MenuService</code>.
        </p>
        <MenuList menuService={menuService} />
      </div>
    </div>
  );
};

export default DependenceInversionPrincipe;
