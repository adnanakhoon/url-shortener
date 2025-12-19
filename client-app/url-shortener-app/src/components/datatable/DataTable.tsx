import { API_URL } from "../../helpers/Constants";
import type { UrlData } from "../../interface/UrlData";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export interface IAppProps {
  data: UrlData[];
  updateReloadState?: () => void;
}

export function DataTable({ data,updateReloadState }: IAppProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const handleCopy = async (shortUrl: string) => {
    const shortLink = `${API_URL}/shortUrl/${shortUrl}`;
    await navigator.clipboard.writeText(shortLink);
    setCopiedId(shortUrl);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const deleteUrl = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`${API_URL}/shortUrl/${id}`);
      setDeletedId(id);
        if (updateReloadState) {
            updateReloadState();
        }

      setTimeout(() => {
        setDeletingId(null);
        setDeletedId(null);
      }, 1500);
    } catch (error) {
      setDeletingId(null);
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-white/30">
          
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h2 className="text-white text-lg font-semibold tracking-wide">
              Shortened URLs
            </h2>
          </div>

          <table className="min-w-full">
            <thead className="bg-linear-to-r from-indigo-100 to-purple-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Original URL
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Shortened URL
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b last:border-none hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 transition"
                >
                  {/* Original URL */}
                  <td className="px-6 py-4 text-sm text-gray-800 max-w-sm truncate">
                    <Link
                      to={item.fullUrl}
                      target="_blank"
                      className="text-indigo-600 hover:text-purple-600 hover:underline"
                    >
                      {item.fullUrl}
                    </Link>
                  </td>

                  {/* Short URL + Copy */}
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`${API_URL}/shortUrl/${item.shortUrl}`}
                        target="_blank"
                        className="text-indigo-600 hover:text-purple-600 hover:underline"
                      >
                        {item.shortUrl}
                      </Link>

                      <button
                        onClick={() => handleCopy(item.shortUrl)}
                        className={`
                          px-3 py-1 text-xs font-medium rounded-full
                          bg-linear-to-r from-indigo-500 to-purple-500
                          text-white shadow hover:scale-105 transition
                        `}
                      >
                        {copiedId === item.shortUrl ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {item.clicks}
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-4 text-sm">
                    <button
                      disabled={deletingId === item._id}
                      onClick={() => deleteUrl(item._id)}
                      className={`
                        px-4 py-1.5 text-xs font-semibold rounded-full transition
                        ${
                          deletedId === item._id
                            ? "bg-green-100 text-green-700"
                            : "bg-linear-to-r from-red-500 to-pink-500 text-white hover:scale-105"
                        }
                        ${deletingId === item._id && "opacity-60 cursor-not-allowed"}
                      `}
                    >
                      {deletedId === item._id
                        ? "Deleted"
                        : deletingId === item._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          {data.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              No URLs found 🚀
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
