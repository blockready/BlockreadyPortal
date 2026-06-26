import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/auth.service";

import "./AppHeader.css";

export default function AppHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSignOut =
    async () => {
      try {
        await authService.signOut();
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };

  const firstName =
    user?.user_metadata?.first_name ||
    user?.user_metadata?.firstName ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <header className="br-header">
      <div className="br-header__container">
        <Link
  to="/library"
  className="br-header__brand"
>
  <img
    src="/blockready-logo.png"
    alt="Blockready"
    className="br-header__logo"
  />

  <span className="br-header__brand-text">
    Blockready
  </span>
</Link>

        <div
          className="br-header__menu"
          ref={menuRef}
        >
          <button
            type="button"
            className="br-header__account-button"
            onClick={() =>
              setMenuOpen(
                (prev) => !prev
              )
            }
          >
            Account
            <span className="br-header__caret">
              ▼
            </span>
          </button>

          {menuOpen && (
            <div className="br-header__dropdown">
              <div className="br-header__greeting">
                Hi {firstName}
              </div>

              <a
                href="https://www.blockready.com/book"
                target="_blank"
                rel="noopener noreferrer"
                className="br-header__dropdown-item"
              >
                Book a Call
              </a>

              <button
                type="button"
                className="br-header__dropdown-item"
                onClick={
                  handleSignOut
                }
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}