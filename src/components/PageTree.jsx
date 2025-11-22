import { useEffect, useState } from "react";
import { useRouter, useMenu } from "../utils";
import { invoke } from "@tauri-apps/api/core";

const TreeNode = ({ page }) => {
  const menu = useMenu();
  const [open, setOpen] = useState(false);
  const [children, setChildren] = useState(null);

  const setCurrent = useRouter((state) => state.setCurrent);

  useEffect(() => {
    const loadChildren = async () => {
      try {
        const result = await invoke("get_pages_command", { id: page.id });
        setChildren(result?.data || []);
      } catch (e) {
        console.error("Failed to load child pages:", e);
        setChildren([]);
      }
    };

    loadChildren();
  }, [menu.updated]);

  const toggle = (e) => {
    e.stopPropagation();
    setOpen((open) => !open);
  };

  const onOpenPage = (e) => {
    e.preventDefault();
    setCurrent(page.id);
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    menu.setX(e.clientX);
    menu.setY(e.clientY);
    menu.setId(page.id);
    menu.setShow(true);
  };

  const hasChildren = children && children.length > 0;

  return (
    <div className="mb-1 w-full">
      <div
        onClick={onOpenPage}
        onContextMenu={onContextMenu}
        className="flex items-center text-white cursor-pointer hover:bg-[#303030] rounded-lg px-1 py-1 transition pr-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          width="24"
          height="24"
          className={`mr-1 transition-transform rounded hover:bg-[#ffffff20] ${
            open ? "rotate-90" : ""
          }`}
          onClick={toggle}
        >
          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
        </svg>

        <span>{page.title}</span>
      </div>

      {open && (
        <div className="ml-2 pl-1">
          {children === null ? (
            <div className="text-gray-500">Loading...</div>
          ) : hasChildren ? (
            children.map((child) => <TreeNode key={child.id} page={child} />)
          ) : (
            <div className="text-gray-500 ml-3">No pages</div>
          )}
        </div>
      )}
    </div>
  );
};

const PageTree = () => {
  const menu = useMenu();
  const [children, setChildren] = useState(null);

  useEffect(() => {
    const loadChildren = async () => {
      try {
        const result = await invoke("get_pages_command", { id: null });
        setChildren(result?.data || []);
      } catch (e) {
        console.error("Failed to load child pages:", e);
        setChildren([]);
      }
    };

    loadChildren();
  }, [menu.updated]);

  return (
    <div className="flex flex-col justify-start items-start ">
      {children === null ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        children.map((child) => <TreeNode key={child.id} page={child} />)
      )}
    </div>
  );
};

export default PageTree;
