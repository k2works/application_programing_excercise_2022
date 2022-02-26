import React, { useEffect } from "react";
export const TodoItemCountView: React.FC<{ count: number }> = (props) => {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    const getApi = (url: string) => {
      const service = (
        resolve: (value?: string) => void,
        reject: (reason?: any) => void
      ) => {
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            return resolve(json);
          })
          .catch((error) => {
            return reject(error);
          });
      };
      return new Promise(service);
    };

    (async () => {
      const result = await getApi("http://localhost:3000/api/todos/count");
      if (result) setCount(parseInt(result));
      if (props.count === 0) setCount(0);
    })();
  }, [props.count]);

  return (
    <footer className="footer">
      <span>Todoアイテム数: {count}</span>
    </footer>
  );
};
