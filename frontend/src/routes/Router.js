  import { lazy } from "react";
  import { Navigate } from "react-router-dom";
  import RequireAuth from "../RequireAuth";

  /****Layouts*****/
  const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
  /****End Layouts*****/

  /*****Pages******/
  const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1"));
  const Login = lazy(() => import("../pages/Shared/Login.js"));
  const Setting = lazy(() => import("../pages/Shared/Setting.js"));
  const Reset = lazy(() => import("../pages/Shared/ResetPassword.js"));
  const OSLCreateUser = lazy(() => import("../pages/OSL/CreateUser.js"));
  const ForgetPassword = lazy(() => import("../pages/Shared/ForgetPassword.js"));
  const FifthRowHomepage = lazy(() => import("../pages/FifthRow/Homepage"));
  const FifthRowEPF = lazy(() => import("../pages/FifthRow/EPF/EPF"));
  const FifthRowEPFSubmit = lazy(() => import("../pages/FifthRow/EPF/Submit"));
  const FifthRowEPFView = lazy(() => import("../pages/FifthRow/EPF/View"));

  const OSLHomepage = lazy(() => import("../pages/OSL/Homepage"));
  const OSLEPF = lazy(() => import("../pages/OSL/EPF/EPF"));
  const OSLEPFSubmit = lazy(() => import("../pages/OSL/EPF/Submit"));
  const OSLEPFView = lazy(() => import("../pages/OSL/EPF/View"));

  const RootHomepage = lazy(() => import("../pages/Root/Homepage"));
  const RootEPF = lazy(() => import("../pages/Root/EPF/EPF"));
  const RootEPFSubmit = lazy(() => import("../pages/Root/EPF/Submit"));
  const RootEPFView = lazy(() => import("../pages/Root/EPF/View"));

  /*****Tables******/
  const BasicTable = lazy(() => import("../views/tables/BasicTable"));

  // form elements
  const ExAutoComplete = lazy(() =>
    import("../views/FormElements/ExAutoComplete")
  );
  const ExButton = lazy(() => import("../views/FormElements/ExButton"));
  const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox"));
  const ExRadio = lazy(() => import("../views/FormElements/ExRadio"));
  const ExSlider = lazy(() => import("../views/FormElements/ExSlider"));
  const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch"));
  // form layouts
  const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts"));

  /*****Routes******/

  const ThemeRoutes = [
    { path: "/", element: <Navigate to="/login" replace/> },
    { path: "/login",  element: <Login /> },
    { path: "/forget-password", element: <ForgetPassword />},
    { path: "/reset-password", element: <Reset/>},
    {
      path: "/",
      element: <RequireAuth allowedGroups={["FRE","OSL","ROOT"]}/>,
      children: [
        { path: "/Setting", element: <Setting />},
        { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
        { path: "tables/basic-table", element: <BasicTable /> },
        { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
        { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
        { path: "/form-elements/button", element: <ExButton /> },
        { path: "/form-elements/checkbox", element: <ExCheckbox /> },
        { path: "/form-elements/radio", element: <ExRadio /> },
        { path: "/form-elements/slider", element: <ExSlider /> },
        { path: "/form-elements/switch", element: <ExSwitch /> },
      ],
    },
    {
      path:"/",
    element:<RequireAuth allowedGroups={["FRE"]}/>,
    children:[    
      { path: "/fifthrow/homepage", exact: true, element: <FifthRowHomepage />},
      { path: "/fifthrow/epf", exact: true, element:<FifthRowEPF /> },
      { path: "/fifthrow/epf/new", exact: true, element: <FifthRowEPFSubmit />},
      { path: "/fifthrow/epf/view/:epf_id", exact: true, element: <FifthRowEPFSubmit />},
      { path: "/fifthrow/epf/view", exact: true, element: <FifthRowEPFView /> },
      ],
    },
    {
      path:"/",
    element:<RequireAuth allowedGroups={["OSL"]}/>,
    children:[ 
      { path: "/osl/homepage", exact: true, element: <OSLHomepage /> },
      { path: "/osl/CreateUser", exact: true, element: <OSLCreateUser /> },
      { path: "/osl/epf", exact: true, element: <OSLEPF /> },
      { path: "/osl/epf/submit", exact: true, element:<OSLEPFSubmit />  },
      { path: "/osl/epf/view/:epf_id", exact: true, element: <OSLEPFSubmit /> },
      { path: "/osl/epf/view", exact: true, element: <OSLEPFView /> },
      ],
    },
    {
      path:"/",
    element:<RequireAuth allowedGroups={["ROOT"]}/>,
    children:[ 
      { path: "/root/homepage", exact: true, element: <RootHomepage />},
      { path: "/root/epf", exact: true, element: <RootEPF />},
      { path: "/root/epf/submit", exact: true, element: <RootEPFSubmit   />},
      { path: "/root/epf/view/:epf_id", exact: true, element: <RootEPFSubmit />},
      { path: "/root/epf/view", exact: true, element: <RootEPFView />},
      ],
    },
  ];

  export default ThemeRoutes;
