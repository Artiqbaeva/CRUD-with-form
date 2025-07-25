import { useState, type FormEvent } from "react";
import Create from "./Create";

interface Blog {
  id: number;
  title: string;
  body: string;
}

const Home = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [data, setData] = useState<Blog[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      // UPDATE
      setData(
        data.map((blog) =>
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
    setTitle("");
    setBody("");
  };

  const handleDelete = (id: number) => {
    setData(data.filter((blog) => blog.id !== id));
  };

  const handleEdit = (id: number) => {
    const blog = data.find((item) => item.id === id);
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setEditId(id);
    }
  };

  return (
    <div>
      <div className="container mx-auto ">
        <h2 className="text-xl font-bold my-6">Home CRUD</h2>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-1 rounded-lg border-gray-300"
          placeholder="title"
          type="text"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border px-3 py-1 rounded-lg border-gray-300"
          placeholder="body"
          type="text"
        />
        <button className="border px-3 py-1 rounded-lg border-gray-300">
          {editId ? "Update" : "Submit"}
        </button>
      </form>

      <Create data={data} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default Home;
