import { Outlet } from "react-router-dom";
import MainNav from "../Components/Common/Navbar";

export function Layout() {
  return (
    <div>
      <MainNav />
      <Outlet />
    </div>
  );
}
export default Layout;
