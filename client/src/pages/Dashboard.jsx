import React, { useEffect, useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import CreationIteam from "../components/CreationIteam";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [plan, setPlan] = useState("Free");
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      console.log("Clerk User:", user);
    }
  }, [isLoaded, user]);

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
        setPlan(data.plan === "premium" ? "Premium" : "Free");
      } else {
        toast.error(data.message || "Failed to fetch creations");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching creations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      getDashboardData();
    }
  }, [isLoaded]);

  return (
    <div className="min-w-0 p-4 sm:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Creations */}
        <div className="flex items-center justify-between w-full p-4 sm:px-6 bg-white rounded-xl border border-gray-200">
          <div className="min-w-0">
            <p className="text-sm text-slate-600">Total Creations</p>
            <h2 className="text-xl font-semibold">
              {creations.length}
            </h2>
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Active Plan */}
        <div className="flex items-center justify-between w-full p-4 sm:px-6 bg-white rounded-xl border border-gray-200">
          <div className="min-w-0">
            <p className="text-sm text-slate-600">Active Plan</p>
            <h2 className="text-xl font-semibold">
              {plan}
            </h2>
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] shrink-0">
            <Gem className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-11 h-11 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
        </div>
      ) : (
        <div className="mt-6">
          <p className="mb-4 text-slate-600 font-medium">
            Recent Creations
          </p>

          <div className="space-y-3">
            {creations.length > 0 ? (
              creations.map((item) => (
                <CreationIteam key={item.id} item={item} />
              ))
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-slate-500">
                No creations found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;