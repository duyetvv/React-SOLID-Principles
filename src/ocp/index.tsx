import { useState, useCallback } from "react";

import { CSS_CLASSES } from "./core/constants";
import { MOCK_USERS, MOCK_PRODUCTS } from "./core/constants/mockData";
import { Button, List, Modal } from "./components";
import { EXTENDED_THEME, DARK_THEME } from "./core/themes";

import "./styles/index.scss";

function OpenClosedPrinciple() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDelete = useCallback(() => {
    console.log("Item deleted");
    handleModalClose();
  }, [handleModalClose]);

  return (
    <div className="ocp">
      <h1>Open/Closed Principle Examples</h1>

      {/* Example 1: Button with Composition & Theme Extensibility */}
      <section>
        <h2>1. Composition + Theme Extensibility (Button)</h2>
        <p>
          The Button component is closed for modification but truly open for
          extension. Instead of hardcoding variants in constants, we pass custom
          themes dynamically. No component code needs to change to support new
          button styles!
        </p>

        <div style={{ marginBottom: "20px" }}>
          <h4>Default Theme (Built-in)</h4>
          <div className={CSS_CLASSES.FLEX_CONTAINER}>
            <Button onClick={() => console.log("Clicked")} variant="primary">
              Primary Button
            </Button>
            <Button
              startIcon={<span>👋</span>}
              onClick={() => console.log("Hi")}
              variant="secondary"
            >
              With Icon
            </Button>
            <Button variant="danger">Delete</Button>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h4>Extended Theme (Custom)</h4>
          <p style={{ fontSize: "12px", color: "#666" }}>
            This theme was created without modifying the Button component -
            that's true OCP!
          </p>
          <div className={CSS_CLASSES.FLEX_CONTAINER}>
            <Button theme={EXTENDED_THEME} variant="primary">
              Primary (Extended)
            </Button>
            <Button theme={EXTENDED_THEME} variant="success">
              Success (New Variant!)
            </Button>
            <Button theme={EXTENDED_THEME} variant="warning">
              Warning (New Variant!)
            </Button>
            <Button theme={EXTENDED_THEME} variant="info">
              Info (New Variant!)
            </Button>
          </div>
        </div>

        <div>
          <h4>Dark Theme (Completely Custom)</h4>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Another example theme - create unlimited themes by passing different
            theme objects!
          </p>
          <div
            className={CSS_CLASSES.FLEX_CONTAINER}
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <Button theme={DARK_THEME} variant="primary">
              Dark Primary
            </Button>
            <Button theme={DARK_THEME} variant="secondary">
              Dark Secondary
            </Button>
            <Button theme={DARK_THEME} variant="success">
              Dark Success
            </Button>
            <Button theme={DARK_THEME} variant="warning">
              Dark Warning
            </Button>
          </div>
        </div>
      </section>

      {/* Example 2: List with Render Props */}
      <section>
        <h2>2. Render Props (List)</h2>
        <p>
          The List component handles iteration but delegates rendering to the
          consumer. It is closed for modification of list logic but open for
          extension via renderItem callback.
        </p>
        <div
          className={`${CSS_CLASSES.FLEX_CONTAINER} ${CSS_CLASSES.FLEX_CONTAINER_SPACED}`}
        >
          <div>
            <h4>Users</h4>
            <List
              items={MOCK_USERS}
              renderItem={(user) => <span>👤 {user.name}</span>}
              keyExtractor={(user) => user.id}
            />
          </div>
          <div>
            <h4>Products</h4>
            <List
              items={MOCK_PRODUCTS}
              renderItem={(product) => <span>📦 {product.title}</span>}
              keyExtractor={(product) => product.id}
            />
          </div>
        </div>
      </section>

      {/* Example 3: Modal with Slots */}
      <section>
        <h2>3. Slots (Modal)</h2>
        <p>
          The Modal defines structure but allows extending the footer actions
          via props. It is closed for modification but open for extension via
          footer, size, and event callbacks.
        </p>
        <Button onClick={handleModalOpen} variant="primary">
          Open Modal
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title="Delete Item?"
          size="small"
          closeOnEsc
          closeOnBackdropClick
          footer={
            <div
              className={`${CSS_CLASSES.FLEX_CONTAINER} ${CSS_CLASSES.FLEX_CONTAINER_END}`}
            >
              <Button onClick={handleModalClose} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="danger">
                Delete
              </Button>
            </div>
          }
        >
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </Modal>
      </section>
    </div>
  );
}

export default OpenClosedPrinciple;
