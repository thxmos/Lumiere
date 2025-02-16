import { CheckIcon, ClockIcon, MailIcon, ScanEyeIcon } from "lucide-react";
import { validateAuthPage } from "@/shared/utils/security/auth";
import { ScrollToTopLayout } from "@/shared/components/layouts/scroll-to-top.layout";
import { DashboardCard } from "@/shared/components/layouts/dashboard-card";
import { Card } from "@/shared/components/ui/card";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";

interface Props {
  children: React.ReactNode;
}

const ForesightLayout: React.FC<Props> = async ({ children }) => {
  const user = await validateAuthPage();

  const path = "foresight";
  const title = "Foresight";
  const description = "Light up your path";
  const headerIcon = <ScanEyeIcon />;

  return (
    <div className="flex">
      <div className="flex bg-background">
        <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8">
          <ScrollToTopLayout>{children}</ScrollToTopLayout>
        </main>
      </div>
      <main className="flex flex-col overflow-y-auto bg-background w-[30%] gap-4 p-8 pl-0">
        <DashboardCard title="Priority Tasks" description="Your priority tasks">
          {[
            {
              title: "Task 1",
              description: "Task description",
              completeByDate: "2025-01-01",
            },
            {
              title: "Task 2",
              description: "Task description",
              completeByDate: "2025-01-01",
            },
            {
              title: "Task 3",
              description: "Task description",
              completeByDate: "2025-01-01",
            },
          ].map((task) => (
            <Card className="flex p-2 gap-2 items-center hover:border-primary transition-all justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="flex items-center w-14 h-14 border border-secondary">
                  <Image
                    src={user?.avatar || "/images/user.png"}
                    alt="User"
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {task.completeByDate}
                  </p>
                </div>
              </div>
              <div>
                <Button variant="ghost">
                  <CheckIcon />
                </Button>
              </div>
            </Card>
          ))}
        </DashboardCard>
        <DashboardCard
          title="Collaborators"
          description="One of the best ways to grow your reach is to collaborate with others."
        >
          {[
            { username: "User 1" },
            { username: "User 2" },
            { username: "User 3" },
          ].map((collabUser) => (
            <Card className="flex p-2 gap-2 items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Image
                  src={user?.avatar || "/images/user.png"}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <p>{collabUser.username}</p>
              </div>
              <div>
                <Button variant="ghost">
                  <MailIcon />
                </Button>
              </div>
            </Card>
          ))}
        </DashboardCard>
      </main>
    </div>
  );
};

export default ForesightLayout;
