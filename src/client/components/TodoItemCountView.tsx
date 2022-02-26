import React, { useEffect } from "react";

const userCountApi = (url: string, propsCount: number) => {
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
      const result = await getApi(url);
      if (result) setCount(parseInt(result));
      if (propsCount === 0) setCount(0);
    })();
  }, [propsCount]);

  return [count, setCount];
};

export const TodoItemCountView: React.FC<{ count: number }> = (props) => {
  const [count, setCount] = userCountApi(
    "http://localhost:3000/api/todos/count",
    props.count
  );

  return (
    <footer className="footer">
      <span>Todoアイテム数: {count}</span>
    </footer>
  );
};
