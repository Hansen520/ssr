/*
 * @Date: 2024-01-19 11:26:02
 * @Description: description
 */
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";

// ./src/pages/Home/index.tsx
const Home = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  return (
    <Fragment>
      <Helmet>
        <title>简易的服务器端渲染 - HOME</title>
        <meta name="description" content="服务器端渲染"></meta>
      </Helmet>
      <div>
        <h1>hello1-ssr-seo-虫子爬</h1>
        <button
          onClick={(): void => {
            alert("hello-ssr");
          }}
        >
          alert
        </button>
        <a href="http://127.0.0.1:3000/demo">链接跳转</a>
        <span
          style={{ color: "#681919", cursor: "pointer" }}
          onClick={(): void => {
            navigate("/demo");
          }}
        >
          路由跳转
        </span>
        <h1>Counters {count} times</h1>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </Fragment>
  );
};

export default Home;
