import { DashboardCard } from "@/components/dashboard-card";
import { InviteSection } from "./invite.section";
import { WorkbenchSection } from "./workbench.section";
import Link from "next/link";

const AdminPage = async () => {
  return (
    <>
      <DashboardCard title="Kanban" description="Current work in progress">
        <Link
          href="https://kanbanflow.com/board/jrY8bCn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-muted-foreground underline hover:text-primary transition-colors"
        >
          Kanban
        </Link>
      </DashboardCard>
      <InviteSection />
      <WorkbenchSection />
    </>
  );
};

export default AdminPage;
