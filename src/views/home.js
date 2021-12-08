import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const f = async () => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`);
    const json = await res.json();
    setUsers(json.data);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event.currentTarget, "event");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item) => {
    if (item === "logOut") {
      navigate("/");
    }
    setAnchorEl(null);
  };
  useEffect(() => {
    f();
  }, [page]);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, #8360c3, #2ebf91)`,
        height: "100%",
        position: "absolute",
        left: "0px",
        top: "0px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            marginLeft: 100,
          }}
        >
          <h1>Hello ReqRes users!</h1>
        </div>
        <div>
          <Button
            variant="contained"
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            color="warning"
            aria-expanded={open ? "true" : undefined}
            style={{ marginRight: 50 }}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("logOut")}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img key={user.avatar} src={user.avatar} />
              </div>
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 50,
          left: "36%",
          right: "64%",
          width: "100%",
        }}
      >
        <Pagination
          count={10}
          variant="outlined"
          onChange={(_, page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
