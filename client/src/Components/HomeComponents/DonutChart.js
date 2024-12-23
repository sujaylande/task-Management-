import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { BiRefresh } from "react-icons/bi";
import Spinner from "../ReusableComponents/Spinner";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClickReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div>
      <div className="shadow-md shadow-blue-500/50 border border-gray-300 rounded-md p-4 my-2 flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[400px] py-12 px-12">
        <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] min-[320px]:mb-6 sm:mb-8">
          <p className="font-roboto text-lg font-medium">
            All Tasks - Status Wise
          </p>
          <button>
            <BiRefresh size="25px" onClick={handleClickReload} />
          </button>
        </div>
        {!isLoading ? (
          <Doughnut
            data={data}
            options={{
              responsive: true,
              plugins: { legend: { display: true } },
            }}
          />
        ) : (
          <div className="flex justify-center my-8">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default DonutChart;
