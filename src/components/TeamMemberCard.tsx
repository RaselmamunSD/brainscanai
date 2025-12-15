import { Mail, GraduationCap, IdCard } from "lucide-react";
import { TeamMember } from "@/data/teamData";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const isSupervisor = member.role === "supervisor";

  return (
    <div 
      className={cn(
        "bg-card rounded-2xl border overflow-hidden hover-lift group",
        isSupervisor 
          ? "border-primary/30" 
          : "border-border"
      )}
    >
      {isSupervisor && (
        <div className="medical-gradient px-4 py-2 text-center">
          <span className="text-sm font-medium text-primary-foreground">Project Supervisor</span>
        </div>
      )}
      
      <div className={cn("p-10 py-12", isSupervisor && "pt-8")}>
        <div className="flex flex-col items-center text-center gap-6">
          {/* Avatar - Circular & Larger with vibrant ring */}
          <div className="relative shrink-0">
            <div className={cn(
              "rounded-full p-1 bg-gradient-to-br from-primary via-secondary to-accent",
              isSupervisor ? "p-1.5" : "p-1"
            )}>
              <img
                src={member.image}
                alt={member.name}
                className={cn(
                  "rounded-full object-cover border-4 border-card",
                  isSupervisor 
                    ? "w-40 h-40" 
                    : "w-36 h-36"
                )}
              />
            </div>
            {isSupervisor && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-2 bg-primary rounded-full shadow-lg">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h3 className={cn(
              "font-semibold text-foreground",
              isSupervisor ? "text-xl" : "text-lg"
            )}>
              {member.name}
            </h3>
            
            {member.designation && (
              <p className="text-primary font-medium text-sm">
                {member.designation}
              </p>
            )}

            <div className="space-y-2 flex flex-col items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IdCard className="h-4 w-4 shrink-0" />
                <span>{member.studentId}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4 shrink-0" />
                <span className="text-center">{member.university}</span>
              </div>
              
              <a 
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{member.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
