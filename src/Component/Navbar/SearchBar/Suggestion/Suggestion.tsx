import React from "react";
import type ISuggestion from "./ISuggestion";
import { Link } from "react-router-dom";

const Suggestion : React.FC<ISuggestion> = ({data}) => {
    return (
        <div className="flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer">
            <Link to={`/Search?product=${data.Name}`} className="flex items-center gap-4 w-full">
          <img
            src={data.ImageURL}
            alt={data.Name}
            className="w-12 h-12 object-cover rounded flex-none"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{data.Name}</p>
            <p className="text-sm text-gray-500">₹{data.Price}</p>
          </div>
            </Link>
        </div>
      );
}

export default Suggestion;