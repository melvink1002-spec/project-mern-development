import { useState, useContext } from "react";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function AddTask({ projectId, onAdd }) {
    const { token } = useContext(AuthContext);

    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    const submit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            alert("Task title required");
            return;
        }

        try {
            const newTask = await request(
                `/projects/${projectId}/tasks`,
                "POST",
                form,
                token
            );

            onAdd(newTask);
            setForm({ title: "", description: "" });
        } catch (err) {
            console.error(err);
            alert("Failed to add task");
        }
    };

    return (
        <div
            style={{
                border: "1px solid",
                borderRadius: "8px",
                padding: "15px",
                backgroundColor: "white",
                maxWidth: "400px",
                width: "100%",
            }}
        >
            <form
                onSubmit={submit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "20px",
                    maxWidth: "400px"
                }}
            >
                <h3>Add Task</h3>

                <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                    style={{ padding: "8px" }}
                />

                <input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                    style={{ padding: "8px" }}
                />
                <button type="submit" style={{ cursor: "pointer", padding: "8px" }}>
                    Add Task
                </button>
            </form>
        </div>
    );
}