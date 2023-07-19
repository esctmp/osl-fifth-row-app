import {
  AddToPhotosOutlined,
  AlbumOutlined,
  AspectRatioOutlined,
  AssignmentTurnedInOutlined,
  AutoAwesomeMosaicOutlined,
  DashboardOutlined,
  DescriptionOutlined,
  SwitchCameraOutlined,
  SwitchLeftOutlined,
} from "@material-ui/icons/";

const Menuitems = [
  {
    title: "FifthRow_Homepage",
    href: "fifthrow/homepage",
  },
  {
    title: "FifthRow_EPF",
    href: "fifthrow/epf",
  },
  {
    title: "FifthRow_Create New EPF",
    href: "fifthrow/epf/new",
    type: "sub-heading"
  },
  {
    title: "FifthRow_View EPF List",
    href: "fifthrow/epf/view",
    type: "sub-heading"
  },
  {
    title: "OSL_Homepage",
    href: "osl/homepage",
  },
  {
    title: "OSL_EPF",
    href: "osl/epf",
  },
  {
    title: "OSL_Review EPF",
    href: "osl/epf/submit",
    type: "sub-heading"
  },
  {
    title: "OSL_View EPF List",
    href: "osl/epf/view",
    type: "sub-heading"
  },
  {
    title: "Root_Homepage",
    href: "root/homepage",
  },
  {
    title: "Root_EPF",
    href: "root/epf",
  },
  {
    title: "Root_Review EPF",
    href: "root/epf/submit",
    type: "sub-heading"
  },
  {
    title: "Root_View EPF List",
    href: "root/epf/view",
    type: "sub-heading"
  },
  {
    title: "Dashboard",
    icon: DashboardOutlined,
    href: "/dashboards/dashboard1",
  },
  {
    title: "Autocomplete",
    icon: AddToPhotosOutlined,
    href: "/form-elements/autocomplete",
  },
  {
    title: "Buttons",
    icon: AspectRatioOutlined,
    href: "/form-elements/button",
  },
  {
    title: "Checkbox",
    icon: AssignmentTurnedInOutlined,
    href: "/form-elements/checkbox",
  },
  {
    title: "Radio",
    icon: AlbumOutlined,
    href: "/form-elements/radio",
  },
  {
    title: "Slider",
    icon: SwitchCameraOutlined,
    href: "/form-elements/slider",
  },
  {
    title: "Switch",
    icon: SwitchLeftOutlined,
    href: "/form-elements/switch",
  },
  {
    title: "Form",
    icon: DescriptionOutlined,
    href: "/form-layouts/form-layouts",
  },
  {
    title: "Table",
    icon: AutoAwesomeMosaicOutlined,
    href: "/tables/basic-table",
  },
];

export default Menuitems;
