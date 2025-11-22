import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import PageTree from "./PageTree";
import { useMenu } from "../utils";

const Sidebar = () => {
  const [pages, setPages] = useState([]);
  const menu = useMenu();

  useEffect(() => {
    const fetchPages = async () => {
      const pages = await invoke("get_pages_command");
      setPages(pages);
    };

    fetchPages();
  }, [menu.show]);

  const openContextMenu = (e) => {
    e.preventDefault();

    menu.setShow(true);
    menu.setX(e.clientX);
    menu.setY(e.clientY);
    menu.setId(null);
  };

  return (
    <div
      onContextMenu={openContextMenu}
      className="p-1 bg-[#202020] h-screen w-[30%]"
    >
      <PageTree />
    </div>
  );
};

export default Sidebar;
