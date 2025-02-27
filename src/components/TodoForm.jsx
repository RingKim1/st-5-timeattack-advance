import { useState } from "react";
import { todoApi } from "../api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // TODO: useMutation 으로 리팩터링 하세요.

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newTodo) => todoApi.post("/todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  const handleAddTodo = async (e) => {
    e.preventDefault();

    addMutation.mutate({
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    });

    setTitle("");
    setContents("");
    // await todoApi.post("/todos", {
    //   id: Date.now().toString(),
    //   title,
    //   contents,
    //   isCompleted: false,
    //   createdAt: Date.now(),
    // });
    // await fetchData();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
