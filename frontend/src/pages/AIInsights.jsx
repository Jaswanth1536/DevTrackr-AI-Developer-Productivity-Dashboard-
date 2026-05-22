import { useEffect, useState } from "react";
import { fetchAIInsights } from "../services/api";

const AIInsights = () => {
const [insights, setInsights] = useState("");
const [loading, setLoading] = useState(true);

useEffect(() => {
const loadInsights = async () => {
try {
const data = await fetchAIInsights();


    setInsights(data.insights);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

loadInsights();


}, []);

if (loading) {
return ( <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center"> <h1 className="text-2xl font-bold">
Generating AI Insights... </h1> </div>
);
}

return ( <div className="min-h-screen bg-gray-900 p-6 text-white"> <h1 className="text-3xl font-bold mb-8">
AI Productivity Insights </h1>


  <div className="bg-gray-800 p-6 rounded-2xl border border-blue-500/20 whitespace-pre-line shadow-lg">
    {insights}
  </div>
</div>


);
};

export default AIInsights;
