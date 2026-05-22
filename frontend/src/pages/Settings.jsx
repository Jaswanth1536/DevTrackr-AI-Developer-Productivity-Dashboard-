import { User, Shield, Github } from "lucide-react";

const Settings = () => {
return ( <div className="min-h-screen bg-gray-950 text-white p-6">


  <div className="mb-8">
    <h1 className="text-3xl font-bold">
      Settings
    </h1>

    <p className="text-gray-400 mt-2">
      Manage your account and integrations.
    </p>
  </div>

  <div className="grid gap-6 lg:grid-cols-2">

    {/* Profile Card */}
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

      <div className="flex items-center gap-3 mb-6">
        <User className="h-6 w-6 text-blue-400" />

        <h2 className="text-xl font-semibold">
          Profile Information
        </h2>
      </div>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-400">
            Username
          </p>

          <p className="mt-1 font-medium">
            user1
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Email
          </p>

          <p className="mt-1 font-medium">
            user1@gmail.com
          </p>
        </div>

      </div>
    </div>

    {/* Security Card */}
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-green-400" />

        <h2 className="text-xl font-semibold">
          Security
        </h2>
      </div>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <span className="text-gray-300">
            JWT Authentication
          </span>

          <span className="text-green-400 text-sm">
            Active
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">
            GitHub Integration
          </span>

          <span className="text-green-400 text-sm">
            Connected
          </span>
        </div>

      </div>
    </div>

    {/* GitHub Integration */}
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 lg:col-span-2">

      <div className="flex items-center gap-3 mb-6">
        <Github className="h-6 w-6 text-white" />

        <h2 className="text-xl font-semibold">
          GitHub Integration
        </h2>
      </div>

      <p className="text-gray-400 leading-7">
        Your GitHub repositories are successfully connected.
        DevTrackr is actively syncing commits, pull requests,
        and issue telemetry for analytics and AI insights.
      </p>

    </div>

  </div>
</div>


);
};

export default Settings;
