import { useState } from "react";
import "./App.css";

type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editId !== null) {
      const updatedContacts = contacts.map((item) => {
        if (item.id === editId) {
          return { ...item, ...form };
        }
        return item;
      });

      setContacts(updatedContacts);
      setEditId(null);
    } else {
      const newContact = {
        id: Date.now(),
        ...form,
      };

      setContacts([...contacts, newContact]);
    }

    setForm({
      name: "",
      phone: "",
      email: "",
    });
  }

  function handleEdit(contact: Contact) {
    setForm({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    });

    setEditId(contact.id);
  }

  function handleDelete(id: number) {
    const remainingContacts = contacts.filter((item) => item.id !== id);

    setContacts(remainingContacts);
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Contact Directory</h2>

      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="form-control mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          className="form-control mb-3"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button className="btn btn-dark">
          {editId !== null ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      <div className="row">
        {contacts.map((contact) => (
          <div className="col-md-4 mb-3" key={contact.id}>
            <div className="card p-3">
              <h5>{contact.name}</h5>

              <p>Phone: {contact.phone}</p>

              <p>Email: {contact.email}</p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <p className="text-center text-muted">No Contacts Found!</p>
      )}
    </div>
  );
}

export default App;
