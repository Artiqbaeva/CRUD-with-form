import React from 'react'
import Home from './pages/Home'
import Create from './pages/Create'
import {  useRoutes } from 'react-router-dom'
import Layout from './pages/Layout'
import FormRef from './components/FormRef'
import FormUseform from './components/FormUseform'

const App = () => {
  
  return (
   <div>
      {useRoutes([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Home />, 
            },
            {
              path: "create",
              element: <Create data={[]} onDelete={() => {}} onEdit={() => {}} />,
            },
            {
              path: "usereform",
              element: <FormRef  />,
            },
            {
              path: "useform",
              element: <FormUseform  />,
            }
          
          
          ],
        },
       
      ])}
   </div>
  )
}

export default React.memo(App)