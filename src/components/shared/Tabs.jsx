"use client";
import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex justify-center border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              activeTab === index
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } py-4 px-6 inline-flex items-center border-b-2 font-medium text-sm focus:outline-none`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="w-full flex-col bg-white text-gray-800 backdrop-blur-lg rounded-2xl p-4 mt-8">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
