// app/components/ui/Input.tsx
import { cn } from '@/lib/utils'

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        className
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        className
      )}
      rows={4}
      {...props}
    />
  )
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full appearance-none rounded-xl border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}