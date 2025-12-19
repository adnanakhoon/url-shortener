import { useState } from "react";
import { API_URL } from "../../helpers/Constants";
import axios from "axios";

export interface IAppProps {
    updateReloadState?: () => void;
}

export function FormContainer ({updateReloadState }: IAppProps) {
    const [fullUrl, setfullUrl] = useState<string>('');

    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/shortUrl`, { fullUrl:fullUrl }) ;
            setfullUrl('')
            updateReloadState && updateReloadState();
            console.log("API_URL:", API_URL);

        } 
         catch (error) {
            console.log(error);
            
        }

    }
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Shorten Your URL
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Paste a long URL and get a short one instantly
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="https://example.com"
            className="w-full px-4 py-3 border rounded-xl outline-none
                       focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
            required
            value={fullUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setfullUrl(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl
                       font-medium hover:bg-blue-700
                       active:scale-95 transition"
          >
            Shorten URL
          </button>
        </form>
      </div>
    </div>
  );
}
