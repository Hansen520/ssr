/*
 * @Date: 2024-01-19 10:15:38
 * @Description: description
 */
// ./src/server/index.tsx
import express from "express";
import { renderToString } from "react-dom/server";
// import Home from '@/pages/Home/index'
import { StaticRouter } from "react-router-dom/server";
import path from "path";
import { Route, matchRoutes, RouteObject, Routes } from "react-router-dom";
import router from "@/router";
import { Helmet } from "react-helmet";
import { serverStore } from "@/store";
import { Provider } from "react-redux";

const app = express();
// const content = renderToString(<Home />)
const bodyParser = require("body-parser");

/* 作为静态资源导入 */
app.use(express.static(path.resolve(process.cwd(), "client_build")));

// 请求body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 启动一个post服务
app.post("/api/getDemoData", (req, res) => {
  res.send({
    data: req.body,
    status_code: 0,
    ssh: 0
  })
})

app.get("*", (req, res) => {
  const routeMap = new Map<string, () => Promise<any>>();
  router.forEach((item) => {
    if (item.path && item.loadData) {
      routeMap.set(item.path, item.loadData(serverStore))
    }
  });

  // 匹配当前路由的routes
  const matchedRoutes = matchRoutes(router as RouteObject[], req.path);
  const promises: Array<() => Promise<any>> = [];
  matchedRoutes?.forEach(item => {
    if (routeMap.has(item.pathname)) {
      promises.push(routeMap.get(item.pathname) as () => Promise<any>)
    }
  })

  Promise.all(promises).then(() => {
    // 统一放到state里
    // 编译需要熏染jsx，转成对应的HTML STRING
    const content = renderToString(
      <Provider store={serverStore}>
        <StaticRouter location={req.path}>
          <Routes>
            {router.map((item, index) => {
              return <Route {...item} key={index} />;
            })}
          </Routes>
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic();
    res.send(`
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.context = {
              state: ${JSON.stringify(serverStore.getState())}
            }
          </script>
        </body>
        <script src="/index.js"></script>
      </html>
    `);
  })

  
});

app.listen(3000, () => {
  console.log("ssr-server listen on 3000");
});

// childProcess.exec("start http://127.0.0.1:3000");
