import React, { type FC } from "react";

interface Blog {
  id: number;
  title: string;
  body: string;
}

interface Props {
  data: Blog[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const Create: FC<Props> = ({ data, onDelete, onEdit }) => {
  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-xl font-bold">Posts</h2>
      <div className="grid grid-cols-5 gap-3 py-4">
        {data.map((item, index) => (
          <div key={item.id} className="border p-4 rounded-lg relative border-gray-200">
            <div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.body}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-blue-500 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
            <span className="absolute bottom-0 right-0 bg-gray-700 text-white size-6 grid place-items-center rounded-ee-lg ">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Create);
