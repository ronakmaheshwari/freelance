interface AdminContentHeadProps {
    title: string;
    subtitle?: string;
  }
  
  export default function AdminContentHead({ title, subtitle }: AdminContentHeadProps) {
    return (
      <div className="w-full py-6 px-4 rounded-xl mb-4 border border-b-4-zinc-50">
        <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-600 mt-1">{subtitle}</p>}
      </div>
    );
  }
  