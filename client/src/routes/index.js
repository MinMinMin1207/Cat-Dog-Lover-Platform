import Home from "~/Pages/Home";
import Login from "~/Pages/Login";
import Register from "~/Pages/Register";
import HomeMember from "~/Pages/HomeMember";
import Author from "~/components/Layout/Author";
import Shopping from "~/Pages/Shopping";
import Cart from "~/Pages/Cart";
import Checkout from "~/Pages/Checkout/Home";
import CheckoutOrder from "~/Pages/Checkout/OrderComplete";
import Product from "~/Pages/Product";
import Post from "~/Pages/Post";
import UpdateProduct from "~/Pages/UpdateProduct";
import Order_History from "~/Pages/OrderHistory";
import Pet from "~/Pages/Pet";
import Profile from "~/Pages/Profile";
import PetCheckout from "~/Pages/Checkout/PetCheckOut";
import PetCheckoutOrder from "~/Pages/Checkout/PetOrderComplete";
import UpdatePet from "~/Pages/UpdatePet";
import Contact from "~/Pages/Contact";
import ContactMember from "~/Pages/ContactMember";
import Gift from "~/Pages/Gift";
import ForgotPass from "~/Pages/ForgotPass";
import ServiceItem from "~/Pages/ServiceItem";
import HomeAdmin from "~/Pages/HomeAdmin";
import PostStatistic from "~/Pages/PostStatistic";
import WrapperAdmin from "~/components/Layout/Admin/Wrapper";
import PendingPost from "~/Pages/PendingPost";
import ProductDetail from "~/Pages/ProductDetailAdmin";
import AllPostAdmin from "~/Pages/AllPostAdmin";
import AcceptPost from "~/Pages/AcceptPost";
import RejectedPost from "~/Pages/RejectedPost";
import Pet_Order_History from "~/Pages/PetOrderHistory";
import HomeService from "~/Pages/HomeService";
import AllSearch from "~/Pages/AllSearch";
import BanUser from "~/Pages/BanUser";
import PendingPostUser from "~/Pages/PendingPostUser";
import TermUser from "~/Pages/TermUser";
import PolicyUser from "~/Pages/PolicyUser";
import AllStatistic from "~/Pages/AllStatistic";
import ProductSold from "~/Pages/ProductSoldUser";
import ManageOrder from "~/Pages/ManageOrderUser";
import Blog from "~/Pages/Blog";
import BlogItem from "~/Pages/BlogItem";
import GiftPage from "~/Pages/GiftPage";
import GiftItem from "~/Pages/GiftItem";
import Incomes from "~/Pages/Incomes";
import PostBlog from "~/Pages/PostBlog";
import PreviewBlog from "~/Pages/PreviewBlog";
import BlogPendingAdmin from "~/Pages/BlogPendingAdmin";
import BlogAcceptAdmin from "~/Pages/BlogAcceptAdmin";
import BlogRejectedAdmin from "~/Pages/BlogRejectedAdmin";
import ServiceOrder from "~/Pages/ServiceOrder";
import ManagePetOrderUser from "~/Pages/ManagePetOrderUser";
import ServicePendingAdmin from "~/Pages/ServicePendingAdmin";
import ServiceRejectedAdmin from "~/Pages/ServiceRejectedAdmin";
import ServiceAcceptedAdmin from "~/Pages/ServiceAcceptedAdmin";
import ServiceBill from "~/Pages/ServiceBill";
import AvailableUser from "~/Pages/AvailableUser";
import OrderGift from "~/Pages/OrderGift";
import ProductDashBoard from "~/Pages/ProductDashBoard";
import PetDashBoard from "~/Pages/PetDashBoard";
import AvailableStaff from "~/Pages/AvailableStaff";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    Layout: Author,
  },
  {
    path: "/register",
    component: Register,
    Layout: Author,
  },
  {
    path: "/home",
    component: HomeMember,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/homeservice",
    component: HomeService,
  },
  {
    path: "/contactmember",
    component: ContactMember,
  },
  {
    path: "/shop",
    component: Shopping,
  },
  {
    path: "/cart",
    component: Cart,
  },

  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/checkoutorder",
    component: CheckoutOrder,
  },
  {
    path: "/petcheckout",
    component: PetCheckout,
  },
  {
    path: "/petcheckoutorder",
    component: PetCheckoutOrder,
  },
  {
    path: "/product/:id",
    component: Product,
  },
  {
    path: "/post",
    component: Post,
  },
  {
    path: "/postblog",
    component: PostBlog,
  },
  {
    path: "/previewblog",
    component: PreviewBlog,
  },
  {
    path: "/updateproduct/:id",
    component: UpdateProduct,
  },
  {
    path: "/updatepet/:id",
    component: UpdatePet,
  },
  {
    path: "/managepostuser",
    component: PendingPostUser,
  },
  {
    path: "/manageorderuser",
    component: ManageOrder,
  },
  {
    path: "/serviceorderuser",
    component: ServiceOrder,
  },
  {
    path: "/productsolduser",
    component: ProductSold,
  },
  {
    path: "/orderhistory",
    component: Order_History,
  },
  {
    path: "/blog",
    component: Blog,
  },
  {
    path: "/blog/:id",
    component: BlogItem,
  },
  {
    path: "/termuser",
    component: TermUser,
  },
  {
    path: "/policyuser",
    component: PolicyUser,
  },
  {
    path: "/petorderhistory",
    component: Pet_Order_History,
  },
  {
    path: "/pet/:id",
    component: Pet,
  },
  {
    path: "/profile/:id",
    component: Profile,
  },
  {
    path: "/pendinggift",
    component: Gift,
  },
  {
    path: "/ordergift",
    component: OrderGift,
  },
  {
    path: "/gift/:id",
    component: GiftItem,
  },
  {
    path: "/giftpage",
    component: GiftPage,
  },
  {
    path: "/allSearch/:search",
    component: AllSearch,
  },
  {
    path: "/homeadmin",
    component: HomeAdmin,
    Layout: WrapperAdmin,
  },
  {
    path: "/forgotpass",
    component: ForgotPass,
  },
  {
    path: "/serviceitem/:id",
    component: ServiceItem,
  },
  {
    path: "/poststatisticadmin",
    component: PostStatistic,
    Layout: WrapperAdmin,
  },
  {
    path: "/allstatistic",
    component: AllStatistic,
    Layout: WrapperAdmin,
  },
  {
    path: "/pendingpost",
    component: PendingPost,
    Layout: WrapperAdmin,
  },
  {
    path: "/productdetail/:id",
    component: ProductDetail,
    Layout: WrapperAdmin,
  },
  {
    path: "/allpost",
    component: AllPostAdmin,
    Layout: WrapperAdmin,
  },
  {
    path: "/acceptedpost",
    component: AcceptPost,
    Layout: WrapperAdmin,
  },
  {
    path: "/rejectedpost",
    component: RejectedPost,
    Layout: WrapperAdmin,
  },
  {
    path: "/availableuser",
    component: AvailableUser,
    Layout: WrapperAdmin,
  },
  {
    path: "/availablestaff",
    component: AvailableStaff,
    Layout: WrapperAdmin,
  },
  {
    path: "/banuser",
    component: BanUser,
    Layout: WrapperAdmin,
  },
  {
    path: "/blogpendingadmin",
    component: BlogPendingAdmin,
    Layout: WrapperAdmin,
  },
  {
    path: "/incomes",
    component: Incomes,
    Layout: WrapperAdmin,
  },
  {
    path: "/blogacceptadmin",
    component: BlogAcceptAdmin,
    Layout: WrapperAdmin,
  },
  {
    path: "/blogrejectedadmin",
    component: BlogRejectedAdmin,
    Layout: WrapperAdmin,
  },
  {
    path: "/managepetorderuser",
    component: ManagePetOrderUser,
  },
  {
    path: "/servicependingadmin",
    component: ServicePendingAdmin,
    Layout: WrapperAdmin,
  },
  {
    path: "/serviceacceptadmin",
    component: ServiceAcceptedAdmin,
    Layout: WrapperAdmin,
  },
  {
    path: "/servicerejectedadmin",
    component: ServiceRejectedAdmin,
    Layout: WrapperAdmin,
  },
  {
    path: "/servicebill",
    component: ServiceBill,
  },
  {
    path: "/productdashboard",
    component: ProductDashBoard,
    Layout: WrapperAdmin,
  },
  {
    path: "/petdashboard",
    component: PetDashBoard,
    Layout: WrapperAdmin,
  },
];

export { publicRoutes };
