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
      
      <div className={cn(
        "p-6 py-8 sm:p-8 sm:py-10 md:p-10 md:py-12", 
        isSupervisor && "pt-6 sm:pt-8"
      )}>
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
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
                    ? "w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40" 
                    : "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
                )}
              />
            </div>
            {isSupervisor && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-1.5 sm:p-2 bg-primary rounded-full shadow-lg">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-2 w-full">
            <h3 className={cn(
              "font-semibold text-foreground",
              isSupervisor 
                ? "text-lg sm:text-xl" 
                : "text-base sm:text-lg"
            )}>
              {member.name}
            </h3>
            
            {member.designation && (
              <p className="text-primary font-medium text-xs sm:text-sm">
                {member.designation}
              </p>
            )}

            <div className="space-y-2 flex flex-col items-center">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <IdCard className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="break-all text-center">{member.studentId}</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <img 
                  src="/bubt-logo.png" 
                  alt="BUBT Logo" 
                  className="h-4 w-4 sm:h-5 sm:w-5 object-contain shrink-0" 
                />
                <span className="text-center break-words px-1 font-medium">{member.university}</span>
              </div>
              
              <a 
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:underline break-all px-2"
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">{member.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
