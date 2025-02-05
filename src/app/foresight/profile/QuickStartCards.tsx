import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircle,
  Link as LinkIcon,
  CalendarDays,
  SwordsIcon,
  CalendarDaysIcon,
} from "lucide-react";

const QuickStartCards = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="flex flex-col hover:border-primary transition-colors">
        <CardHeader>
          <div className="mb-4 flex items-center justify-center">
            <LinkIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">
            Connect Your First Account
          </CardTitle>
          <CardDescription className="text-center">
            Link your Instagram or TikTok to start analyzing your audience and
            content performance
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Takes less than 2 minutes</li>
            <li>• Instant audience insights</li>
            <li>• See your best performing content</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Connect Account</Button>
        </CardFooter>
      </Card>

      <Card className="flex flex-col hover:border-primary transition-colors">
        <CardHeader>
          <div className="mb-4 flex items-center justify-center">
            <SwordsIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">
            Create Your First Campaign
          </CardTitle>
          <CardDescription className="text-center">
            Launch a 2-week promotion campaign for your latest release with
            AI-generated content ideas
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Choose your release date</li>
            <li>• Get daily content prompts</li>
            <li>• Auto-schedule your posts</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Start Campaign</Button>
        </CardFooter>
      </Card>

      <Card className="flex flex-col hover:border-primary transition-colors">
        <CardHeader>
          <div className="mb-4 flex items-center justify-center">
            <CalendarDaysIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">Schedule Your Week</CardTitle>
          <CardDescription className="text-center">
            Plan your next 7 days of content with our AI content calendar
            assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Get personalized post ideas</li>
            <li>• Find optimal posting times</li>
            <li>• Keep your feed consistent</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Open Calendar</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuickStartCards;
