const API_URL =
"https://devtrackr-ai-developer-productivity-rvwa.onrender.com";

// -----------------------------
// COMMON HEADERS
// -----------------------------
const getHeaders = () => {
const headers = {
"Content-Type": "application/json",
};

const token = localStorage.getItem("token");

if (token) {
headers["Authorization"] = `Bearer ${token}`;
}

return headers;
};

// -----------------------------
// GENERIC API METHODS
// -----------------------------
export const api = {
get: async (endpoint) => {
const response = await fetch(
`${API_URL}${endpoint}`,
{
method: "GET",
headers: getHeaders(),
}
);


const data = await response.json();

if (!response.ok) {
  throw new Error(
    data.message || "Something went wrong"
  );
}

return data;


},

post: async (endpoint, body) => {
const response = await fetch(
`${API_URL}${endpoint}`,
{
method: "POST",
headers: getHeaders(),
body: JSON.stringify(body),
}
);


const data = await response.json();

if (!response.ok) {
  throw new Error(
    data.message || "Something went wrong"
  );
}

return data;


},
};

// -----------------------------
// AI INSIGHTS
// -----------------------------
export const fetchAIInsights =
async () => {
const response = await fetch(
`${API_URL}/api/ai`
);


return response.json();


};

// -----------------------------
// COMMITS
// -----------------------------
export const fetchCommits =
async (owner, repo, token) => {
const response = await fetch(
`${API_URL}/api/analytics/commits/${owner}/${repo}`,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.json();


};

// -----------------------------
// PULL REQUESTS
// -----------------------------
export const fetchPullRequests =
async (owner, repo) => {
const response = await fetch(
`${API_URL}/api/analytics/prs/${owner}/${repo}`
);


return response.json();


};

// -----------------------------
// ISSUES
// -----------------------------
export const fetchIssues =
async (owner, repo) => {
const response = await fetch(
`${API_URL}/api/analytics/issues/${owner}/${repo}`
);


return response.json();


};
