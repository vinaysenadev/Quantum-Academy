import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-between">
      <button className="button-rounded rounded-md flex items-center px-4 bg-gray-300">
        <ChevronLeft className="icon" /> Previous
      </button>
      <div className="flex gap-4">
        <button className="button-rounded px-4">1</button>
        <button className="px-4 hover:bg-Sky rounded-full">2</button>
        <button className="px-4 hover:bg-Sky rounded-full">3</button>
        <button className="">....</button>
        <button className="px-4 hover:bg-Sky rounded-full">4</button>
      </div>

      <button className="button-rounded rounded-md flex items-center px-4 bg-gray-300">
        Next
        <ChevronRight className="icon" />
      </button>
    </div>
  );
};

export default Pagination;
