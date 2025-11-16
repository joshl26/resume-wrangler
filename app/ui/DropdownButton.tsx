"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e: any) => {
    setIsOpen(false);
    setStatus(e.target.name);
    handleSearch(e.target.id);
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", "all");
    params.delete("page");
    if (term) {
      params.set("sort", term);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="dropdown-container">
      <div className="dropdown">
        <button
          type="button"
          className="dropdown-button"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="dropdown-button-text">
            {status === "" ? "Sort By" : status}
          </span>
          <svg
            className={`dropdown-icon ${isOpen ? "rotated" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <ul role="list" className="dropdown-list">
              <li>
                <button
                  type="button"
                  id="all"
                  name="All Applications"
                  className="dropdown-item"
                  onClick={closeDropdown}
                >
                  All Applications
                </button>
              </li>
              <li>
                <button
                  id="not_submitted"
                  name="Not Submitted"
                  className="dropdown-item"
                  onClick={closeDropdown}
                >
                  Not Submitted
                </button>
              </li>
              <li>
                <button
                  id="submitted"
                  name="Submitted"
                  className="dropdown-item"
                  onClick={closeDropdown}
                >
                  Submitted
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
