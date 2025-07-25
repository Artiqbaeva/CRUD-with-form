import  { useState } from "react";
import { useForm } from "react-hook-form";

interface Blog {
  id: number;
  title: string;
  body: string;
}

interface FormValues {
  title: string;
  body: string;
}

const FormUseform = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>();
  const [data, setData] = useState<Blog[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const onSubmit = (formData: FormValues) => {
    if (!formData.title || !formData.body) return;

    if (editId) {
      // UPDATE
      setData((prev) =>
        prev.map((blog) =>
          blog.id === editId
            ? { ...blog, title: formData.title, body: formData.body }
            : blog
        )
      );
      setEditId(null);
    } else {
      // CREATE
      const newBlog: Blog = {
        id: new Date().getTime(),
        title: formData.title,
        body: formData.body,
      };
      setData([...data, newBlog]);
    }

    reset(); 
  };

  const handleEdit = (id: number) => {
    const blog = data.find((item) => item.id === id);
    if (blog) {
      setValue("title", blog.title);
      setValue("body", blog.body);
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter((blog) => blog.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold my-6"> React Hook Form</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-3 mb-6"
      >
        <input
          {...register("title")}
          className="border px-3 py-1 rounded-lg border-gray-300"
          placeholder="title"
          type="text"
        />
        <input
          {...register("body")}
          className="border px-3 py-1 rounded-lg border-gray-300"
          placeholder="body"
          type="text"
        />
        <button className="border px-3 py-1 rounded-lg border-gray-300">
          {editId ? "Update" : "Submit"}
        </button>
      </form>

      <div className="grid grid-cols-5 gap-3">
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
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>

            <span className="absolute bottom-0 right-0 bg-gray-700 text-white size-6 grid place-items-center rounded-ee-lg">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormUseform;
