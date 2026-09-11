import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode;
}

export function Card({ title, children, ...rest }: CardProps) {
  return (
    <div className="ui-card" {...rest}>
      {title !== undefined && <h3 className="ui-card__title">{title}</h3>}
      <div className="ui-card__body">{children}</div>
    </div>
  );
}
