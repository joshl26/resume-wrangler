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
    console.log(e.target.id);
    handleSearch(e.target.id);
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    // console.log(`Searching... ${term}`);

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
    <div className="w-full">
      <div className="relative inline-block">
        <button
          type="button"
          className="px-4 py-[9px] w-[175px] tight-shadow rounded bg-white hover:bg-rose-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-light text-sm inline-flex items-center"
          onClick={toggleDropdown}
        >
          {status === "" ? "Sort By" : status}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
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
          <div className="origin-top-right z-30 absolute right-0 mt-2 w-44 rounded-lg tight-shadow bg-white ring-1 ring-black ring-opacity-5">
            <ul role="list" aria-labelledby="options-menu">
              <li>
                <button
                  type="button"
                  id="all"
                  name="All Applications"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={closeDropdown}
                >
                  All Applications
                </button>
              </li>
              <li>
                <button
                  id="not_submitted"
                  name="Not Submitted"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={closeDropdown}
                >
                  Not Submitted
                </button>
              </li>
              <li>
                <button
                  id="submitted"
                  name="Submitted"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={closeDropdown}
                >
                  Submitted
                </button>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdown}
                >
                  Rejected
                </a>
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
