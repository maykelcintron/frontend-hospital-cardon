import logo from "../assets/ivss.jpeg";

export function BrandLogo({ size = 36, withText = true, subtitle = "Sistema clínico" }: { size?: number; withText?: boolean; subtitle?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="rounded-xl bg-white grid place-items-center overflow-hidden border border-border/60 shadow-[var(--shadow-card)]"
        style={{ height: size, width: size }}
      >
        <img src={logo} alt="IVSS" className="h-full w-full object-contain p-0.5" />
      </div>
      {withText && (
        <div>
          <div className="font-display font-extrabold leading-none tracking-tight">IVSS</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</div>
        </div>
      )}
    </div>
  );
}