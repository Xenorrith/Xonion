import { invoke } from "@tauri-apps/api/core";
import { useMenu } from "../utils";
import { useEffect, useRef } from "react";

const ContextMenu = () => {
  const menu = useMenu();
  const update = useMenu((state) => state.setUpdated);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      menu.setShow(false);
    }
  };

  const createPage = () => {
    invoke("create_page_command", {
      title: "New Page",
      parentId: menu.id || null,
    });
    update(!menu.updated);
    menu.setShow(false);
  };

  const renamePage = () => {
    console.log("rename page");
    update(!menu.updated);
    menu.setShow(false);
  };

  const deletePage = () => {
    invoke("delete_page_command", {
      id: menu.id,
    });
    update(!menu.updated);
    menu.setShow(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    menu.show && (
      <ul
        ref={menuRef}
        className="absolute bg-neutral-900 text-white border border-neutral-700 rounded-md shadow-lg p-1 select-none"
        style={{ top: menu.y, left: menu.x }}
      >
        <li
          className="px-3 py-2 hover:bg-neutral-700 rounded cursor-pointer"
          onClick={createPage}
        >
          Create Page
        </li>
        {menu.id && (
          <>
            <li
              className="px-3 py-2 hover:bg-neutral-700 rounded cursor-pointer"
              onClick={renamePage}
            >
              Rename Page
            </li>
            <li
              className="px-3 py-2 hover:bg-red-700 rounded cursor-pointer"
              onClick={deletePage}
            >
              Delete Page
            </li>
          </>
        )}
      </ul>
    )
  );
};

export default ContextMenu;
