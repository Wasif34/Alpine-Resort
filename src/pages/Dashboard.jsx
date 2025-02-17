import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import { useUser } from "../hooks/useUser";

function Dashboard() {
  const { user } = useUser();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          Hello, {user?.user_metadata.fullName || "user"}! 👋🏻
        </Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
