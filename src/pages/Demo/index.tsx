/*
 * @Date: 2024-01-19 17:49:23
 * @Description: description
 */
// ./src/pages/Demo/index.tsx
import { FC, useState, useEffect, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getDemoData } from "./store/demoReducer";
import { Helmet } from "react-helmet";

interface IProps {
  content?: string;
  getDemoData?: (data: string) => void;
}

const Demo: FC<IProps> = (data) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .post("/api/getDemoData", {
        content: "这是一个demo页面" + Math.random(),
      })
      .then((res: { data: { data: { content: string } } }) => {
        setContent(res.data.data.content);
      });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>简易的服务器端渲染框架 - DEMO</title>
        <meta name="description" content="服务器端渲染框架"></meta>
      </Helmet>
      <div>
        <h1>{data.content}</h1>
        <button
          onClick={(): void => {
            data.getDemoData && data.getDemoData("刷新过后的数据");
          }}
        >
          刷新1
        </button>
      </div>
      <div>{content}</div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    content: state?.demo?.content,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDemoData: (data: string) => {
      dispatch(getDemoData(data));
    },
  };
};

const storeDemo: any = connect(mapStateToProps, mapDispatchToProps)(Demo);
storeDemo.getInitProps = (store: any, data?: string) => {
  return store.dispatch(getDemoData(data || '这是初始化的demo1'))
}

export default storeDemo;
