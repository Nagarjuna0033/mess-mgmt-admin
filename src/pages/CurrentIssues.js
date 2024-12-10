import React from "react";
import TopIssuesCard from "../components/TopIssuesCard";
const issues = [
  { name: "Remove Upma From Menu", upvotes: 920, downvotes: 0 },
  { name: "Want Biryani On Sunday", upvotes: 870, downvotes: 10 },
  { name: "Hot Water in Mess", upvotes: 180, downvotes: 20 },
  { name: "Remove Sambar", upvotes: 420, downvotes: 40 },
  { name: "Sunday Dosa Long Line", upvotes: 1870, downvotes: 10 },
];
export default function CurrentIssues() {
  return <TopIssuesCard issues={issues} fromIssues={true} />;
}
