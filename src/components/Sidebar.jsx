import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import {
  Logout,
  LogoutOutlined,
  RemoveRedEyeOutlined,
  Tour,
  TourOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomDialog from "./helper.jsx/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import { setDialogObj } from "../redux/features/helper";
import { customtheme } from "../misc/customtheme";

const drawerWidth = 240;

export default function Sidebar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const helperState = useSelector((state) => state.helper);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Logout Button
  function handleLogout() {
    // Close the modal
    dispatch(setDialogObj({ ...helperState.dialogObj, logout: false }));
    sessionStorage.setItem("auth", null); //clear the storage
    return navigate("/login");
  }

  const sidebarArr = [
    {
      id: crypto.randomUUID,
      text: "Create Visit",
      to: "/create_visit",
      icon: <TourOutlined />,
    },
    {
      text: "Display Visitor",
      to: "/display_visitor",
      icon: <RemoveRedEyeOutlined />,
    },
    {
      text: "Logout",
      to: "",
      icon: <LogoutOutlined />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      {sidebarArr.map((item) => {
        return (
          <Link to={item.to} className="transition-all">
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                sx={{
                  background:
                    location.pathname == item.to
                      ? customtheme.color.primary.main
                      : "inherit",
                  color: location.pathname == item.to ? "white" : "inherit",
                  "&:hover": {
                    background:
                      location.pathname == item.to
                        ? customtheme.color.primary.main
                        : customtheme.color.primary.light,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    background:
                      location.pathname == item.to
                        ? customtheme.color.primary.main
                        : "inherit",
                    color: location.pathname == item.to ? "white" : "inherit",
                    "&:hover": {
                      background: customtheme.color.primary.light,
                    },
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        );
      })}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: customtheme.color.primary.main,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex justify-between w-full">
            <Typography variant="h6" noWrap component="div">
              Visitor Managment System
            </Typography>
            <div className="space-x-3 flex">
              <Typography variant="h6" noWrap component="div">
                {JSON.parse(sessionStorage.getItem("auth")).email}
              </Typography>
              <Button
                startIcon={<LogoutOutlined />}
                variant="contained"
                color="error"
                onClick={() =>
                  dispatch(
                    setDialogObj({ ...helperState.dialogObj, logout: true })
                  )
                }
              >
                Logout
              </Button>
            </div>
          </div>
          <CustomDialog
            open={helperState.dialogObj.logout}
            handleClose={() =>
              dispatch(
                setDialogObj({ ...helperState.dialogObj, logout: false })
              )
            }
            handleSubmit={handleLogout}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
