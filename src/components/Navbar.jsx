import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, selectUser, logout } from "@/store/AuthSlice";
import { Button } from "@/components/ui";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const publicLinks = [
    { id: 1, text: "Home", url: "/" },
    { id: 2, text: "Recipes", url: "/recipes" },
  ];

  const authLinks = [
    { id: 3, text: "Login", url: "/login" },
    { id: 4, text: "Register", url: "/register" },
  ];

  const privateLinks = [
    { id: 5, text: "Profile", url: `/profile/${user?.id || ""}` },
  ];

  return (
    <nav className="bg-slate-200 p-4">
      <div className="flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="font-bold text-orange-600 text-xl">
          <NavLink to="/">Foodie.</NavLink>
        </div>

        {/* Navigation Links */}
        <ul className="flex justify-end items-center gap-4">
          {/* Public links - always visible */}
          {publicLinks.map((link) => (
            <li key={link.id} className="hover:text-gray-100 hover:underline">
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-2 text-base font-medium decoration-orange-400"
                    : ""
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}

          {/* Conditional links based on authentication */}
          {isAuthenticated ? (
            <>
              {/* Private links - only when authenticated */}
              {privateLinks.map((link) => (
                <li
                  key={link.id}
                  className="hover:text-gray-100 hover:underline"
                >
                  <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-2 text-base font-medium decoration-orange-400"
                        : ""
                    }
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}

              <li>
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleLogout}
                  className="hover:bg-orange-50 border-orange-400 text-orange-400"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              {/* Auth links - only when not authenticated */}
              {authLinks.map((link) => (
                <li
                  key={link.id}
                  className="hover:text-gray-100 hover:underline"
                >
                  <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-2 text-base font-medium decoration-orange-400"
                        : ""
                    }
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export { Navbar };
