import React, { useRef, useState, type FormEvent } from "react";

interface Blog {
  id: number;
  title: string;
  body: string;
}

const FormRef = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Blog[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value || "";
    const body = bodyRef.current?.value || "";

    if (!title || !body) return;

    if (editId) {
      // UPDATE
      setData((prev) =>
        prev.map((blog) =>
          blog.id === editId ? { ...blog, title, body } : blog
        )
      );
      setEditId(null);
    } else {
      // CREATE
      const newBlog = {
        id: new Date().getTime(),
        title,
        body,
      };
      setData([...data, newBlog]);
    }

    if (titleRef.current) titleRef.current.value = "";
    if (bodyRef.current) bodyRef.current.value = "";
  };

  const handleDelete = (id: number) => {
    setData(data.filter((blog) => blog.id !== id));
    if (editId === id) setEditId(null);
  };

  const handleEdit = (id: number) => {
    const blog = data.find((item) => item.id === id);
    if (blog) {
      if (titleRef.current) titleRef.current.value = blog.title;
      if (bodyRef.current) bodyRef.current.value = blog.body;
      setEditId(id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container mx-auto mt-3 flex gap-3">
        <input
          ref={titleRef}
          className="border px-3 py-1 rounded-lg border-gray-300"
          placeholder="title"
          type="text"
        />
        <input
          ref={bodyRef}
          className="border px-3 py-1 rounded-lg border-gray-300"
          placeholder="body"
          type="text"
        />
        <button className="border px-3 py-1 rounded-lg border-gray-300">
          {editId ? "Update" : "Submit"}
        </button>
      </form>

      <div className="container mx-auto mt-4">
        <h2 className="text-xl font-bold">Posts</h2>
        <div className="grid grid-cols-5 gap-3 py-4">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg relative border-gray-200"
            >
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.body}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="text-blue-500 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <span className="absolute bottom-0 right-0 bg-gray-700 text-white size-6 grid place-items-center rounded-ee-lg ">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FormRef);
