import {
Star,
GitFork,
ExternalLink,
} from "lucide-react";

const repositories = [
{
id: 1,
name: "DevTrackr",
description:
"AI-powered developer productivity dashboard.",
language: "JavaScript",
stars: 14,
forks: 5,
url: "https://github.com/",
},
{
id: 2,
name: "Portfolio",
description:
"Personal portfolio built with React and Tailwind CSS.",
language: "React",
stars: 11,
forks: 2,
url: "https://github.com/",
},
];

const Repositories = () => {
return ( <div className="min-h-screen bg-gray-950 text-white p-6">


  <div className="mb-8">
    <h1 className="text-3xl font-bold">
      GitHub Repositories
    </h1>

    <p className="text-gray-400 mt-2">
      Connected repositories and telemetry overview.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-2">

    {repositories.map((repo) => (
      <div
        key={repo.id}
        className="rounded-2xl border border-gray-800 bg-gray-900 p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg"
      >

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-xl font-bold">
              {repo.name}
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-6">
              {repo.description}
            </p>
          </div>

          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
          </a>

        </div>

        <div className="mt-6 flex items-center gap-6 text-sm">

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{repo.stars}</span>
          </div>

          <div className="flex items-center gap-2">
            <GitFork className="h-4 w-4 text-violet-400" />
            <span>{repo.forks}</span>
          </div>

          <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400 border border-blue-500/20">
            {repo.language}
          </div>

        </div>

      </div>
    ))}

  </div>
</div>


);
};

export default Repositories;

