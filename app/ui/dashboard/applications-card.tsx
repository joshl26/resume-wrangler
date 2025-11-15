"use client";

import React, { useState, useMemo, useCallback } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Application, Applications } from "@/app/lib/definitions";

type FilterType = "all" | "open" | "pending" | "closed";

const STATUS_FILTERS: {
  id: FilterType;
  label: string;
  color: string;
  activeColor: string;
  condition: (app: Application) => boolean;
}[] = [
  {
    id: "all",
    label: "All",
    color: "purple-heart",
    activeColor: "purple-heart",
    condition: () => true,
  },
  {
    id: "open",
    label: "Open",
    color: "rose",
    activeColor: "rose",
    condition: (app) => app.is_complete === "false",
  },
  {
    id: "pending",
    label: "Pending",
    color: "international-orange",
    activeColor: "international-orange",
    condition: (app) => app.is_complete === "pending",
  },
  {
    id: "closed",
    label: "Closed",
    color: "amber",
    activeColor: "amber",
    condition: (app) => app.is_complete === "true",
  },
];

const ApplicationsCard = ({ applications }: { applications: Applications }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredApplications = useMemo(() => {
    if (!Array.isArray(applications)) return [];

    const filter = STATUS_FILTERS.find((f) => f.id === activeFilter);
    if (!filter || activeFilter === "all") return applications;

    return applications.filter(filter.condition);
  }, [applications, activeFilter]);

  const handleFilterChange = useCallback((filterId: FilterType) => {
    setActiveFilter(filterId);
  }, []);

  // Handle edge cases
  if (!Array.isArray(applications)) {
    return (
      <div className="tour-applications w-full md:w-1/2 h-[275px] bg-white rounded-lg tight-shadow p-4">
        <h2 className="font-bold text-lg mb-4">Applications</h2>
        <div className="flex items-center justify-center h-[190px]">
          <p className="text-gray-500">No applications data available</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className="tour-applications w-full md:w-1/2 h-[275px] bg-white rounded-lg tight-shadow flex flex-col"
      aria-labelledby="applications-heading"
      role="region"
    >
      <div className="flex flex-wrap items-center justify-between p-4 pb-2">
        <h2 id="applications-heading" className="font-bold text-lg">
          Applications
        </h2>
        {/* Time filter placeholder - uncomment when implemented */}
        {/* <div className="relative h-auto w-[125px]">
          <select 
            className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-2 py-1 text-sm"
            aria-label="Filter by time period"
          >
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="today">Today</option>
          </select>
        </div> */}
      </div>

      <div
        className="flex flex-wrap gap-2 px-4 pb-2"
        role="tablist"
        aria-label="Filter applications by status"
      >
        {STATUS_FILTERS.map(({ id, label, color, activeColor }) => (
          <button
            key={id}
            onClick={() => handleFilterChange(id)}
            className={clsx(
              "font-medium px-4 py-1 rounded-full border transition-colors",
              activeFilter === id
                ? `text-white border-${activeColor}-400 bg-${activeColor}-400`
                : `border-${color}-400 bg-white hover:bg-${color}-100`,
            )}
            role="tab"
            aria-selected={activeFilter === id}
            aria-controls="applications-list"
          >
            {label}
          </button>
        ))}
      </div>

      <div
        id="applications-list"
        className="overflow-y-auto flex-1 px-4"
        role="tabpanel"
        tabIndex={0}
      >
        {filteredApplications.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              {activeFilter === "all"
                ? "No applications found"
                : `No ${activeFilter} applications found`}
            </p>
          </div>
        ) : (
          <ul className="space-y-2 pb-2">
            {filteredApplications.map((application) => (
              <li key={application?.id}>
                <Link
                  href={`/dashboard/applications/${application.id}`}
                  className="block group"
                >
                  <div className="flex items-center gap-3 p-3 border rounded-lg transition-shadow hover:shadow-md">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-azure-radiance-400 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {application.job_position?.charAt(0) || "?"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate group-hover:text-azure-radiance-600">
                        {application.job_position || "Untitled Position"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {application.id || "Unknown Company"}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span
                        className={clsx(
                          "px-2 py-1 text-xs font-medium rounded-md",
                          application.is_complete === "true"
                            ? "bg-amber-100 text-amber-800"
                            : application.is_complete === "pending"
                              ? "bg-international-orange-100 text-international-orange-800"
                              : "bg-rose-100 text-rose-800",
                        )}
                      >
                        {application.is_complete === "true"
                          ? "Closed"
                          : application.is_complete === "pending"
                            ? "Pending"
                            : "Open"}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ApplicationsCard;
