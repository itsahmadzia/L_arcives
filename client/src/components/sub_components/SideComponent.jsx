import { Sidebar } from "flowbite-react";
import React from "react";
import {
  HiArrowLeft,
  HiDocument,
  HiDocumentText,
  HiEmojiSad,
  HiUser,
  HiUserCircle,
} from "react-icons/hi";
import { deleteUserSuccess } from "../../redux/user/userSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function SideComponent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const tab = url.get("tab");
    if (tab) setTab(tab);
    console.log(tab);
  }, [location.search]);

  const logout = async () => {
    const res = await fetch(
      "/api/user/signout",

      {
        method: "POST",
      }
    );
    const d = await res.json();
    if (!res.ok) {
      console.log(d.message);
    } else {
      dispatch(deleteUserSuccess()); //clear redux
    }
  };
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup className="text-justify flex flex-col gap-y-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUserCircle}
              label={currentUser.isAdmin ? "admin" : "user"}
              labelColor={"dark"}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                label="Posts"
                labelColor="dark"
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            className="cursor-pointer"
            onClick={logout}
            icon={HiArrowLeft}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
