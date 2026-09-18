import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  category?: string;
  href?: string;
  description: string;
  tags: readonly string[];
  className?: string;
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function ProjectCard({
  title,
  category,
  href,
  description,
  tags,
  className,
}: Props) {
  const linkProps = href
    ? isExternal(href)
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}
    : undefined;

  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200",
        className
      )}
    >
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            {category && (
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {category}
              </span>
            )}
            <h3 className="font-semibold">
              {href ? (
                <Link
                  href={href}
                  {...linkProps}
                  className="hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
          </div>
          {href && (
            <Link
              href={href}
              {...linkProps}
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              aria-label={`Leer el caso: ${title}`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
        <div className="text-sm flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
