import AuthLayout from "./AuthLayout";
import TopBar from "../components/TopBar";

function AuthenticatedLayout({ children, ...authLayoutProps }) {
  return (
    <AuthLayout
      topBarSlot={<TopBar />}
      {...authLayoutProps}
    >
      {children}
    </AuthLayout>
  );
}

export default AuthenticatedLayout;