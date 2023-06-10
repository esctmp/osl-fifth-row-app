import {
  DashboardOutlined,
  AddToPhotosOutlined,
  AspectRatioOutlined,
  AssignmentTurnedInOutlined,
  AlbumOutlined,
  SwitchCameraOutlined,
  SwitchLeftOutlined,
  DescriptionOutlined,
  AutoAwesomeMosaicOutlined,
} from "@material-ui/icons/";

const Menuitems = [
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
