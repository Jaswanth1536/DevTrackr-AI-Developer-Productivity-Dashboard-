import { useEffect, useState } from "react";
import { fetchCommits } from "../services/api";
import CommitChart from "../components/CommitChart";

const Commits = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const loadCommits = async () => {
      const token = localStorage.getItem("token");

      const data = await fetchCommits(
        "facebook",
        "react",
        token
      );

      const formattedData = {};

data.forEach((commit) => {
  const date = commit.commit.author.date.split("T")[0];

  if (!formattedData[date]) {
    formattedData[date] = 0;
  }

  formattedData[date]++;
});

const chartData = Object.keys(formattedData).map((date) => ({
  date,
  commits: formattedData[date],
}));

setCommits(chartData);
    };

    loadCommits();
  }, []);

 return (
  <div className="p-6 bg-gray-900 min-h-screen">
    <CommitChart data={commits} />
  </div>
);
};

export default Commits;